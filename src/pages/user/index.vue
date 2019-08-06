<template>
    <Row>
        <Col :xs="24" :lg="24">
            <Table width="1400" border :columns="columns" :data="tableData"></Table>
            <Row type="flex" justify="end" style="margin-top: 10px">
                <Page :current="model.page" :total="total" :page-size="model.size" :page-size-opts="[10,20,50,100]"
                      @on-change="onPageChange" @on-page-size-change="onPageSizeChange" show-total show-elevator show-sizer
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
            title: '标题',
            fixed: 'left',
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
        model: {
          page: 1,
          size: 10
        }
      }
    },
    mounted() {
      this.getList().then(({data}) => {
        this.tableData = data.data;
      })
    },
    computed: {
      total() {
        return this.tableData.length
      }
    },
    methods: {
      getList() {
        return this.$http.get('http://ms.do-ok.com:18030/api/cycleshow/v1/query?' + this.$qs.stringify({
          schoolCode: '1101053001',
          start: (this.model.page - 1) * this.model.size,
          limit: this.model.size
        }), this.getHeader());
      },
      onPageChange(val) {
        this.model.page = val;
        this.getList();
      },
      onPageSizeChange(val) {
        this.model.size = val;
        this.getList();
      },
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `
            Param: ${window.location.href.split('?')[1].split('=')[1]}
            <br>
            Name：${this.data6[index].name}
            <br>
            Age：${this.data6[index].age}
            <br>
            Address：${this.data6[index].address}
          `
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
    }
  }
</script>

<style scoped>

</style>
