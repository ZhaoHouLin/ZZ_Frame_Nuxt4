# ZZ_Frame_Nuxt

目前使用 Nuxt4 架構
存放我常用的資料夾結構及 cicd 容器化 腳本檔案

## 功能

- 可用 AD 帳號登入
- 上傳下載資料
- 可容器化佈署

## ci/cd 架構

- Gitea 開源程式碼儲存庫
- Drone 自動化構建
- Harbor 映象檔儲存庫

## .env 內容

- NUXT_JWT_SECRET=<驗證密鑰>
- NUXT_LDAP_URL=ldap://xxx.yyy.zzz
- NUXT_LDAP_DOMAIN=xxx.yyy.zzz
- NUXT_UPLOAD_DIR=<目的資料夾路徑>

補充:Nuxt 的安全管理模式。 useRuntimeConfig 的設計是為了讓你可以在不重新打包 Docker Image 的情況下更改設定，而它規定的「映射語法」就是 NUXT\_變數名

NUXT_UPLOAD_DIR=/uploads
需注意容器掛載路徑

以上建立 secret 使用

```
envFrom:
  - secretRef:
      name: zz_frame-dep-secret
```

## yaml

- 檔名前綴為 xxx 表示參考但實測未通過

deployment.yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zz-frame-nuxt4
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: zz-frame-nuxt4
  template:
    metadata:
      labels:
        app: zz-frame-nuxt4
    spec:
      securityContext:
        fsGroup: 1000
      containers:
        - name: nuxt-app
          image: 192.168.79.99:5002/library/zz-frame-nuxt4:latest
          imagePullPolicy: Always # 確保每次重啟都會去 Harbor 拉最新版
          livenessProbe:
            httpGet:
              path: / # 檢查根目錄是否能打開
              port: 3000
            initialDelaySeconds: 15 # 啟動後等 15 秒再開始檢查（給 Nuxt 一點啟動時間）
            periodSeconds: 20 # 每 20 秒檢查一次
            failureThreshold: 3 # 連續失敗 3 次才重啟
          readinessProbe:
            httpGet:
              path: /
              port: 3000
            initialDelaySeconds: 5 # 啟動 5 秒後就開始看能不能接客
            periodSeconds: 10
            successThreshold: 1
            failureThreshold: 3
          ports:
            - containerPort: 3000
          resources:
            limits:
              cpu: "500m"
              memory: "512Mi"
            requests:
              cpu: "250m"
              memory: "256Mi"
          envFrom:
            - secretRef:
                name: zz-frame-dep-secret
          volumeMounts:
            - name: uploads
              mountPath: /uploads
      volumes:
        - name: uploads
          persistentVolumeClaim:
            claimName: nfs-pvc
```

### smb

smb-pv.yaml

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: smb-pv
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  csi:
    driver: smb.csi.k8s.io
    volumeHandle: smb-tools
    volumeAttributes:
      source: "要連結的NAS路徑"
    nodeStageSecretRef:
      name: smb-secret
      namespace: default
  mountOptions:
    - uid=1000
    - gid=1000
    - file_mode=0777
    - dir_mode=0777
```

smb-pvc.yaml

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: smb-pvc
  namespace: default
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
```

smb-secret.yaml

```
apiVersion: v1
kind: Secret
metadata:
  name: smb-secret
type: Opaque
stringData:
  username: NAS帳號
  password: NAS密碼
```

### nfs

nfs-pv.yaml

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity:
    storage: 100Gi # 宣告容量大小
  volumeMode: Filesystem
  accessModes:
    - ReadWriteMany # 允許多個 Pod 同時讀寫
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /volume1/kubernetes # NAS 上的實際路徑
    server: 192.168.79.99 # NAS IP
```

nfs-pvc.yaml

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nfs-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 100Gi
```
