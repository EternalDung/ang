# 使用官方的nginx基础镜像
FROM nginx:stable

# 将dist文件夹中的内容复制到容器的/nginx/html目录下
COPY dist/ /usr/share/nginx/html/

# 暴露80端口，供外部访问
EXPOSE 80

# 当容器启动时执行nginx服务器
CMD ["nginx", "-g", "daemon off;"]
