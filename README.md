# ZZ_Frame_Nuxt4

Nuxt4 架構
存放我常用的資料夾結構

## 功能

- 可用 AD 帳號登入
- 上傳下載資料
- 可容器化佈署

## .env 內容

- JWT_SECRET=<驗證密鑰>
- LDAP_URL=ldap://xxx.yyy.zzz
- LDAP_DOMAIN=xxx.yyy.zzz
- UPLOAD_DIR=<目的資料夾路徑>

UPLOAD_DIR=/uploads
需注意容器掛載路徑

## yaml

- 檔名前綴為 xxx 表示參考但實測未通過

dep.yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nuxt3-test
  name: nuxt3-test
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nuxt3-test
  strategy: {}
  template:
    metadata:
      labels:
        app: nuxt3-test
    spec:
      securityContext:
        fsGroup: 1000
      containers:
        - image: localhost:5000/nuxt3-test:latest
          name: nuxt3-test
          resources: {}
          envFrom:
            - secretRef:
                name: nuxt3-dep-secret
          volumeMounts:
            - name: uploads
              mountPath: /uploads
      volumes:
        - name: uploads
          persistentVolumeClaim:
            claimName: smb-pvc
status: {}
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
