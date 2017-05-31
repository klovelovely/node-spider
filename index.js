/**
 * 数据采集
 */
//引入需要的包
var request = require('request');
var cheerio = require('cheerio');

//定义常量
var dataOrigin = 'http://mar.moe';

//数据请求
function startFetchData(currentDataOrigin) {

    //发送请求
    request({
        url: currentDataOrigin,
        method: 'GET'
    }, function (err, red, body) {

        //请求到body
        if (err) {
            console.log(currentDataOrigin);
            console.error('[ERROR]Collection' + err);
            return;
        }

        if (currentDataOrigin && currentDataOrigin === dataOrigin) {
            parseHTML(body);
        }

    })

}

/**
 * 解析html
 */
function parseHTML(body) {

    var $ = cheerio.load(body);

    var atricles = $('#main-content').find('.article');

    for (var i = 0; i < atricles.length; i++) {
        var article = atricles[i];
        
        var $a = $(article).find('h1');
        var $p = $(article).find('#toc_0');

        var $aVal = $($a).text();
        var $pVal = $($p).text();

        if ($p) {
            console.info('\n-------------- 第 ' + (i + 1) + ' 篇文章 ------------------');
            console.info('标题：' + $aVal);
            console.info('简介：' + $pVal);
            console.info('时间：' + new Date)
            console.info('------------ 第 ' + (i + 1) + ' 篇文章结束 ----------------');
        }
    }

}

//开始发送请求 并 采集数据
startFetchData(dataOrigin);