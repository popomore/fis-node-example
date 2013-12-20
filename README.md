# fis-node-example

---

这个项目 fork 自 [lily-zhangying/fis-site](https://github.com/lily-zhangying/fis-site)，尝试使用 node 实现这个方案。

这个例子使用 express + nunjucks + fis

## 安装

首先要安装 fis

```
$ npm install fis -g
$ npm install fis-parser-marked -g
```

安装项目依赖

```
$ cd fis-node-example
$ npm install
```

启动

```
$ make deploy
```

## 说明

代码比较乱，只是做一个实验，里面有很多坑，有心的同学可以研究下。

如果不想看到合并的文件，实例化 Resource 的时候可以把 pkg 设成 false。
