Component({
  properties: {
    item:{
      type:Object,
      value:{title:'默认标题'},
      
      // observer:function(newVal,oldVal){
      //   console.log(newVal,oldVal)
      // }
    },
    nickName: {
      type: String,
      value: '李四'
    }
  },
  methods: {
  }
})
