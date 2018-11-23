export default {
  created () {},
  data () {
    return {
      tableDate: [
        {
          "cat_id": 1,
          "cat_name": "大家电",
          "cat_pid": 0,
          "cat_level": 0,
          "cat_deleted": false,
          "children": [
            {
              "cat_id": 2,
              "cat_name": "电视",
              "cat_pid": 1,
              "cat_level": 1,
              "cat_deleted": false,
              "children": [
                {
                "cat_id": 3,
                "cat_name": "曲面电视",
                "cat_pid": 2,
                "cat_level": 2,
                "cat_deleted": false
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
