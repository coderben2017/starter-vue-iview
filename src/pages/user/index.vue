<template>
    <Row>
        <Row style="margin-bottom: 5px">
            <Col :xs="24" :lg="{span: 4, offset: 20}">
                <Button type="error" class="fload: right" @click="onDeleteAll">删除选中</Button>
            </Col>
        </Row>
        <Col :xs="24" :lg="24">
            <Table width="1400" border :columns="columns" :data="tableData" ref="table"></Table>
            <Row type="flex" justify="end" style="margin-top: 10px">
                <Page :current="model.page" :total="total" :page-size="model.size" :page-size-opts="[10,20,50,100]"
                      show-total show-elevator show-sizer
                      @on-change="onPageChange" @on-page-size-change="onPageSizeChange"
                ></Page>
            </Row>
        </Col>
    </Row>
</template>

<script>
  export default {
    data () {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            fixed: 'left'
          },
          {
            title: '标题',
            minWidth: 250,
            render: (h, params) => h('span', params.row.topic)
          },
          {
            title: '内容',
            key: 'content',
            width: 250
          },
          {
            title: '是否循环',
            render: (h, params) => h('span', params.row.ifRound === 1 ? '是' : '否'),
            width: 250
          },
          {
            title: '循环次数',
            key: 'cycleNum',
            width: 250
          },
          {
            title: '开始时间',
            key: 'beginTime',
            width: 250
          },
          {
            title: '结束时间',
            key: 'endTime',
            width: 250
          },
          {
            title: '发布时间',
            key: 'createTime',
            width: 250
          },
          {
            title: '操作',
            key: 'action',
            minWidth: 150,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        model: {
          page: 1,
          size: 10
        }
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        this.$http.get('http://ms.do-ok.com:18030/api/cycleshow/v1/query?' + this.$qs.stringify({
          schoolCode: this.getSchoolCode(),
          start: (this.model.page - 1) * this.model.size,
          limit: this.model.size
        }), this.getHeader()).then(({data}) => {
          this.tableData = data.data;
          this.total = data.total;
        });
      },
      onPageChange(val) {
        this.model.page = val;
        this.getList();
      },
      onPageSizeChange(val) {
        this.model.size = val;
        this.getList();
      },
      onDeleteAll() {
        const idStr = this.$refs.table.getSelection().map(item => item.id).join();
        if (idStr) {
          console.log(idStr);
          this.$Message.success('删除成功');
          this.$refs.table.selectAll(false);
        }
      },
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `
            Param: ${window.location.href.split('?')[1].split('=')[1]}
            Topic：${this.tableData[index].topic}
          `
        })
      },
      remove (index) {
        this.tableData.splice(index, 1);
      },
    }
  }
</script>

<style scoped>

</style>
