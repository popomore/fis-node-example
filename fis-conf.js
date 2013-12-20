fis.config.merge({
    project: {
        exclude: /(node_modules|local)/
    },
    modules: {
        parser: {
            md: 'marked'
        }
    },
    roadmap: {
        ext: {
            md: 'html'
        },
        path: [{
            reg: 'map.json',
            release: '/config/map.json'
        }, {
            reg: /^\/(node_modules|plugin|build.sh|Makefile|README)/,
            release: false
        }, {
            reg: /^\/(widget\/.*\.tpl)/i,
            isMod: true,
            url: '$1',
            release: '/template/$1'
        }, {
            reg: /^\/(page\/.*\.tpl)/i,
            release: '/template/$1'
        }, {
            reg: /^\/(docs\/.*\.md)/i,
            release: '/template/page/$1'
        }, {
            reg: /^\/((?:widget|page)\/.*\.js)/i,
            url: '/$1',
            isMod: true,
            release: '/static/$1'
        }, {
            reg: /^\/(lib\/.*\.js)/i,
            url: '/$1',
            release: '/static/$1'
        }, {
            reg: /^\/((?:widget|page|lib)\/.*\.css)/i,
            url: '/$1',
            release: '/static/$1'
        }, {
            reg: /^\/(.*\.(?:png|jpg|gif|jpeg))$/,
            url: '/$1',
            release: '/static/$1'
        }, {
            reg: /static\/(pkg\/.*)/i,
            url: '$1'
        }, {
            reg: /^\/([^\/]*\.js)$/,
            useCompile: false,
            useParser: false,
            useHash: false,
            useStandard: false,
            release: '/$1'
        }]
    },
    settings: {
        postprocessor: {
            //fis-postprocessor-jswrapper插件配置数据
            jswrapper: {
                //使用define包装js组件
                type: 'amd'
            }
        }
    },
    pack: {
        'static/pkg/aio.js': [
            'lib/js/mod.js',
            'lib/**.js',
            'widget/**.js',
            'page/**.js'
        ],
        'static/pkg/aio.css': [
            'lib/css/bootstrap.css',
            'lib/css/bootstrap-responsive.css',
            'lib/css/style.css',
            'lib/**.css',
            'widget/**.css',
            'page/**.css'
        ]
    },
    deploy: {
        remote: {
            receiver: 'http://zhangyunlong.fe.baidu.com/receiver.php',
            to: '/home/zhangyunlong/public_html/'
        },
        local: {
            to: './local'
        }
    }
});