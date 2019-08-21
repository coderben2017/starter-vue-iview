<template>
    <div class="container">
        <Table style="min-width: 800px" border :columns="columns" :data="tableData"></Table>
        <Row type="flex" justify="end" style="margin-top: 10px">
            <Page
                show-total
                show-elevator
                show-sizer
                :current="model.page"
                :total="total"
                :page-size="model.size"
                :page-size-opts="[10,20,50,100]"
                @on-change="onPageChange" @on-page-size-change="onPageSizeChange"
            ></Page>
        </Row>
        <Modal v-model="isDetailModalShow" title="查看" footer-hide width="850" :fullscreen="isModalFullScreen">
            <Table style="min-width: 800px" border :columns="detailColumns" :data="detailData"></Table>
            <Row type="flex" justify="end" style="margin-top: 10px">
                <Page
                    show-total
                    show-elevator
                    show-sizer
                    :current="detailModel.page"
                    :total="detailTotal"
                    :page-size="detailModel.size"
                    :page-size-opts="[10,20,50,100]"
                    @on-change="onDetailPageChange" @on-page-size-change="onDetailPageSizeChange"
                ></Page>
            </Row>
        </Modal>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [{
          title: '表名',
          key: 'tableName',
          sortable: true,
          ellipsis: true
        }, {
          title: '表注释',
          key: 'tableComment',
          sortable: true,
          ellipsis: true
        }, {
          title: '数据库引擎',
          key: 'engine',
          width: 120,
          sortable: true,
          ellipsis: true
        }, {
          title: '创建时间',
          key: 'createTime',
          width: 200,
          sortable: true,
          ellipsis: true
        }, {
          title: '操作',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  custom: 'fa-eye',
                  size: '20'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleLook(params.row)
                  }
                }
              })
            ]);
          }
        }],
        tableData: [],
        total: 0,
        model: {
          page: 1,
          size: 10
        },
        isDetailModalShow: false,
        detailColumns: [{
          title: '字段名',
          key: 'columnName',
          sortable: true,
          ellipsis: true
        }, {
          title: '类型',
          key: 'columnType',
          width: 120,
          sortable: true,
          ellipsis: true
        }, {
          title: '长度',
          key: 'strLength',
          width: 80,
          sortable: true,
          ellipsis: true
        }, {
          title: '非空',
          key: 'isNullable',
          width: 80,
          sortable: true,
          ellipsis: true
        }, {
          title: '键',
          key: 'columnKey',
          width: 80,
          sortable: true,
          ellipsis: true
        }, {
          title: '注释',
          key: 'columnComment',
          sortable: true,
          ellipsis: true
        }],
        detailData: [],
        detailTotal: 0,
        detailModel: {
          page: 1,
          size: 10
        },
        currentRow: 0,
        isModalFullScreen: false
      }
    },
    mounted() {
      this.getList();
      this.isModalFullScreen = window.innerWidth < 576;
    },
    methods: {
      getList: function () {
        this.$http.get(this.dataCenterUrl + '/api/sysTable/v1/getTableList?').then(({data}) => {
          const start = (this.model.page - 1) * this.model.size;
          this.tableData = data.data.slice(start, start + this.model.size);
          this.total = data.data.length;
        });
      },
      onPageChange: function (val) {
        this.model.page = val;
        this.getList();
      },
      onPageSizeChange: function (val) {
        this.model.size = val;
        this.getList();
      },
      handleLook: function (row) {
        this.currentRow = row;
        this.getDetailList();
        this.isDetailModalShow = true;
      },
      getDetailList: function() {
        this.$http.get(this.dataCenterUrl + '/api/sysTable/v1/getFieldList?' + this.$qs.stringify({
          tableName: this.currentRow.tableName
        })).then(({data}) => {
          if (data.data) {
            const start = (this.detailModel.page - 1) * this.detailModel.size;
            this.detailData = data.data.slice(start, start + this.detailModel.size);
            this.detailTotal = data.data.length;
          }
        })
      },
      onDetailPageChange: function (val) {
        this.detailModel.page = val;
        this.getDetailList();
      },
      onDetailPageSizeChange: function (val) {
        this.detailModel.size = val;
        this.getDetailList();
      },
    }
  }
</script>

<style scoped>

</style>
