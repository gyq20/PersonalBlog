var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "hfhuohfsdvdjsvnkhfis"
    },
    computed: {
        getContent: function() {
            return this.content;
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});


var articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [
            {
                title: "这个是标题",
                content: "后返回时哈佛很疯狂的时间了死哦付欸v收风电水电VS【撒【 见佛菩萨减肥茶佛菩萨就",
                date: "2019-5-22",
                views: "101",
                tags: "test1 test2",
                id: "1",
                link: "/"
            },
            {
                title: "这个是标题",
                content: "后返回时哈佛很疯狂的时间了死哦付欸v收风电水电VS【撒【 见佛菩萨减肥茶佛菩萨就",
                date: "2019-5-22",
                views: "101",
                tags: "test1 test2",
                id: "2",
                link: "/"
            },
            {
                title: "这个是标题",
                content: "后返回时哈佛很疯狂的时间了死哦付欸v收风电水电VS【撒【 见佛菩萨减肥茶佛菩萨就",
                date: "2019-5-22",
                views: "101",
                tags: "test1 test2",
                id: "3",
                link: "/"
            }

        ]
    },
    computed: {
        jumpTo: function() {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },

        getPage: function () {
            return function (page, pageSize) {

                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0; i < searchUrlParams.length; i ++) {
                    if (searchUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searchUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }

                if (tag == "") {
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then( function(resp) {
                        console.log("987654321asdfghjkl");
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then( function(resp) {
                        console.log("987654321asdfghjkl");
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(function (resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }


            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];

            result.push({text: "<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }

            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize) });
            articleList.pageNumList = result;
            return result;
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
})


















