

FROM --platform=linux/amd64  node:18-slim
# FROM --platform=linux/amd64  node:20-slim

RUN apt update && \
    apt install libaio1 curl imagemagick unzip nano -y && \
    cd /tmp && \
    curl -o instantclient-basiclite.zip https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip -SL && \
    unzip instantclient-basiclite.zip && \
    mv instantclient*/ /usr/lib/instantclient && \
    rm instantclient-basiclite.zip && \
    ln -s /usr/lib/instantclient/libclntsh.so.21.1 /usr/lib/libclntsh.so && \
    ln -s /usr/lib/instantclient/libocci.so.21.1 /usr/lib/libocci.so && \
    ln -s /usr/lib/instantclient/libociicus.so /usr/lib/libociicus.so && \
    ln -s /usr/lib/instantclient/libnnz21.so /usr/lib/libnnz21.so && \
    ln -s /usr/lib/libnsl.so.2 /usr/lib/libnsl.so.1 && \
    ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2 && \
    ln -s /lib64/ld-linux-x86-64.so.2 /usr/lib/ld-linux-x86-64.so.2

ENV LD_LIBRARY_PATH /usr/lib/instantclient

WORKDIR /src

# RUN npm install --global yarn
RUN npm install --global pm2
RUN apt install lftp

RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 200M
RUN pm2 set pm2-logrotate:dateFormat 'YYMMDD_HHmmss'
RUN pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
RUN pm2 set pm2-logrotate:compress true
# CMD ["pm2-runtime","./app.js"]

# docker build -t mkulali/nodoradeb . && docker push mkulali/nodoradeb