## 一、打包前端项目

1. 通过项目中的package.json文件，找到“build”运行进行打包
   npm run build
2. 打包成功后生成dist文件夹，就是打包好的项目
3. 在根目录中创建一个docker文件夹中创建nginx.conf配置文件, 同时在根目录中创建一个Dockerfile文件


------

**nginx.conf内容：**

```nginx
server {
    listen 80;

    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/html;
    include /etc/nginx/mime.types;
    location / {
        try_files $uri /index.html;
    }
}
```
以下是说明：
1）gzip on; - 启用Gzip压缩功能。

2）gzip_min_length 1k; - 指定压缩的最小文件大小。只有大于等于1千字节的文件才会被压缩。

3） gzip_comp_level 9; - 设置Gzip压缩的级别。级别从1到9，9为最高压缩比，但也会消耗更多的CPU资源。

4） gzip_types - 指定需要进行Gzip压缩的文件类型。在这个例子中，配置了多种类型的文件，包括纯文本文件（text/plain）、CSS文件（text/css）、JavaScript文件（text/javascript、application/json、application/javascript、application/x-javascript）以及XML文件（application/xml）。

5） gzip_vary on; - 在HTTP响应头中添加Vary标头，以通知缓存服务器根据Accept-Encoding头来提供正确的压缩版本。

6） gzip_disable "MSIE [1-6]\.”; - 禁用特定的浏览器压缩。在这个例子中，它禁用了Internet Explorer 1至6版本的Gzip压缩。这是因为早期版本的IE在处理Gzip压缩时可能存在兼容性问题。

------

**Dockerfile内容：**

```dockerfile
FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

以下是说明：
1）FROM nginx: 安装nginx

2）WORKDIR : 工作目录，容器中执行命令时的默认位置

3）COPY：拷贝,从执行目录拷贝指定文件打到容器中的指定目录

4）EXPOSE：声明容器内的服务将监听的端口(指令仅仅是一种文档化的操作，它并不会自动在容器启动时打开这些端口或配置网络连接)

5）CMD 指定容器启动时要执行的默认命令或可执行文件的指令

------

4. 压缩文件为了上传到服务器
   把三个文件或文件夹，压缩成一个压缩包。
   
   ```
       -- dist文件夹
       -- docker文件夹        ==>  压缩为spzx-admin.zip 
       -- Dockerfile文件
   ```
   
   

------

## 二、服务器项目上线

1. docker安装



2. 压缩包上传到服务器
   把打包好的spzx-admin.zip上传到服务器的指定目录，这里以/root/myapp目录为例：

```tex
1.创建myapp目录

mkdir /root/myapp 

2.把压缩包放在目录里

3.进到myapp文件夹,解压文件
unzip spzx-admin.zip -d spzx-admin

4.进入user-center-frontend文件夹执行命令,后面"."不要忽略
docker build -t app-manager-front:1.1.0 .
docker build -t 镜像名称:版本号 .

5.运行docker镜像
```



===================================================

1.查看docker 镜像
docker images

2.根据打包好的镜像，并运行docker
docker run -d --name app-manager-front -p 80:80 --net=spzx app-manager-front:1.1.0

3.查看容器运行状态
docker ps

项目部署成功
