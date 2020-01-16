export const menuList = [
    {
        icon: "home",
        title: "首页",
        key: "/home",
    },
    {
        icon: "database",
        title: "数据管理",
        key: "/dataSource",
    },
    {
        icon: "dashboard",
        title: "数据质量评价",
        key: "/dataQualityEvaluate",
        children: [
            {
                title: "质量评价",
                key: "/dataQualityEvaluate/qualityEvaluate",
                icon: "",
            },
            {
                title: "自定义规则",
                key: "/dataQualityEvaluate/customizeRule",
                icon: "",
            },
            {
                title: "规则模板",
                key: "/dataQualityEvaluate/ruleTemplate",
                icon: "",
            },
            {
                title: "评价任务",
                key: "/dataQualityEvaluate/evaluateTask",
                icon: "",
            },
            {
                title: "评价历史",
                key: "/dataQualityEvaluate/evaluateHistory",
                icon: "",
            },
            {
                title: "评价报告",
                key: "/dataQualityEvaluate/evaluateReport",
                icon: "",
            }
        ]
    },
    {
        icon: "setting",
        title: "系统设置",
        key: "/system",
        children: [
            {
                title: "个人信息",
                key: "/system/userInfo",
                icon: "",
            },
            {
                title: "组织机构",
                key: "/system/org",
                icon: "",
            },
            {
                title: "角色管理",
                key: "/system/role",
                icon: "",
            },
            {
                title: "账号管理",
                key: "/system/user",
                icon: "",
            }
            // {
            //     title: "通知提醒",
            //     key: "/message"
            // }
        ]
    },
]
