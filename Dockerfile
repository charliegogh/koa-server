# 指定环境基于哪个镜像
FROM node:latest

# 设置工作目录
WORKDIR /home/koa

# 复制 package.json 和 package-lock.json（如果有）到工作目录
COPY package*.json ./

RUN npm install --registry=https://registry.npm.taobao.org

# 将应用程序文件复制到工作目录
COPY . .

EXPOSE 88

# 容器启动时执行的命令，类似npm run start
CMD ["npm", "run", "dev"]
