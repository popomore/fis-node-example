var github = 'https://github.com/fis-dev/fis/';
var github_wiki = 'https://github.com/fis-dev/fis/wiki/';

module.exports = {
  title: 'F.I.S - 前端集成解决方案',
  github: github,
  docs: [{
    title: '什么是F.I.S',
    doc: 'intro',
    icon: 'leaf',
    wiki: github_wiki + '什么是F.I.S'
  }, {
    title: '初识F.I.S',
    doc: 'quickstart',
    icon: 'eye-open',
    wiki: github_wiki + '快速上手'
  }, {
    title: '三条开发命令',
    doc: 'commands',
    icon: 'fire',
    wiki: github_wiki + '快速上手#-1'
  }, {

    title: '三种语言能力',
    doc: 'extlang',
    icon: 'gift',
    wiki: github_wiki + '三种语言能力'
  }, {
    title: '静态资源管理',
    doc: 'srms',
    icon: 'magnet',
    wiki: github_wiki + '基于map.json的前后端架构设计指导'
  }, {
    title: '前端资源聚合',
    doc: 'integrated',
    icon: 'inbox',
    wiki: github_wiki + '基于map.json的前后端架构设计指导'
  }, {
    title: '小示例',
    doc: 'demo',
    icon: 'tint',
    wiki: github_wiki + 'fis官网项目'
  }]
};