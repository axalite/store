/*

***************************
QuantumultX:

[rewrite_local]
^https?:\/\/(api|ilisten)\.idaddy\.cn\/(inner4\/|api).+ url script-response-body https://raw.githubusercontent.com/axalite/store/master/scripts/kdgs.js

[mitm]
hostname =api.idaddy.cn

**************************/

let myObj = JSON.parse($response.body);

function findAndReplace(obj, replaceObj, matches) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            // 如果当前属性是一个嵌套对象，则递归调用findAndReplace函数
            findAndReplace(obj[key], replaceObj, matches);
        } else if (Array.isArray(obj[key])) {
            // 如果当前属性是一个数组，则遍历数组中的每个元素
            obj[key].forEach(function (element) {
                findAndReplace(element, replaceObj, matches);
            });
        } else if (key in replaceObj) {
            // 如果当前属性的键与要查找的键匹配，则将其重新赋值为指定的更新对象
            obj[key] = replaceObj[key];
            // 将当前属性的键存储在匹配数组中
            matches.push(key);
        }
    }
}

// 定义要更新的属性
const replaceObj = {
    'is_auth': true,
    'is_free': true,
    'vip_valid_ts': '2999-01-01T08:05:43Z',
    'is_vip': true,
    'is_story_vip': true,
    'is_knowledge_vip': true,
    'is_forever_story_vip': true,
    'is_story_vip_subscribe': true,
    'story_vip_expire_day': 99999,
    'knowledge_vip_expire_day': 99999,
    'story_vip_expire_time': '2999-01-01 08:05:43',
    'knowledge_vip_expire_time': '2999-01-01 08:05:43',
    'vip_create_ts': '2023-01-01T08:05:43Z',
    'is_forever_vip': true,
    'vip': true,
    'is_buy': true,
    'vip_valid_days': 99999,
    'is_subscribe': true,
    'is_buy_vip': true
};

// 存储所有匹配的属性的数组
const matches = [];

// 遍历JSON对象并查找和更新键
findAndReplace(myObj, replaceObj, matches);

// 打印输出更新后的对象
console.log(myObj);

// 遍历所有匹配的属性并输出其键
console.log('Matched properties: ' + matches.join(', '));

$done({
    body: JSON.stringify(myObj)
});

/*
^https?:\/\/api\.idaddy\.cn\/inner4\/ad\?.+ url reject-200
* */