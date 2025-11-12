# Quick Clone Guide: GitHub to Red Hat Sandbox

## 🎯 Your Repository Details

- **GitHub Repo**: `https://github.com/krissi2023/krissi-pimpin-pimpire.git`
- **SSH URL**: `git@github.com:krissi2023/krissi-pimpin-pimpire.git`
- **Project Name**: `krissi-pimpin-pimpire`

## 🚀 Three Ways to Deploy

### Method 1: Direct Deploy from GitHub (Easiest)

```bash
# Login to Red Hat OpenShift
oc login --token=<your-token> --server=<your-server>

# Create project
oc new-project krissi-pimpin-pimpire

# Deploy directly from GitHub (uses HTTPS)
oc new-app nodejs~https://github.com/krissi2023/krissi-pimpin-pimpire.git --name=krissi-pimpin-pimpire

# Expose the service
oc expose svc/krissi-pimpin-pimpire

# Get your URL
oc get route
```

### Method 2: Clone to Local, Then Deploy

```bash
# Clone to your local machine
git clone https://github.com/krissi2023/krissi-pimpin-pimpire.git
cd krissi-pimpin-pimpire

# Login to Red Hat
oc login --token=<your-token> --server=<your-server>

# Create project
oc new-project krissi-pimpin-pimpire

# Create build configuration
oc new-build --binary --name=krissi-pimpin-pimpire

# Build from local source
oc start-build krissi-pimpin-pimpire --from-dir=. --follow

# Deploy using your configuration files
oc apply -f .openshift/deployment.yaml

# Get your URL
oc get route
```

### Method 3: Using SSH (If SSH key is configured)

```bash
# Login to Red Hat
oc login --token=<your-token> --server=<your-server>

# Create project
oc new-project krissi-pimpin-pimpire

# Deploy using SSH URL
oc new-app nodejs~git@github.com:krissi2023/krissi-pimpin-pimpire.git --name=krissi-pimpin-pimpire

# Expose the service
oc expose svc/krissi-pimpin-pimpire

# Get your URL
oc get route
```

## ⚠️ Before You Start

### 1. Get Your OpenShift Login Token

1. Go to your Red Hat Sandbox console
2. Click your username (top right) → "Copy login command"
3. Click "Display Token"
4. Copy the `oc login` command

### 2. Set Up Secrets (Required)

Your app needs the Gemini API key:

```bash
# Get your base64 encoded API key
echo -n "your_gemini_api_key" | base64

# Edit .openshift/secret.yaml with the encoded key
# Then apply it:
oc apply -f .openshift/secret.yaml
```

## 🔧 Quick Commands After Deploy

```bash
# Check if everything is running
oc get pods
oc get svc
oc get routes

# View logs
oc logs -f deployment/krissi-pimpin-pimpire

# Scale up if needed
oc scale deployment/krissi-pimpin-pimpire --replicas=2

# Access pod directly
oc rsh deployment/krissi-pimpin-pimpire
```

## 🧪 Test Your Deployment

Once deployed, test your endpoints:

```bash
# Get your app URL first
APP_URL=$(oc get route krissi-pimpin-pimpire -o jsonpath='{.spec.host}')

# Test basic connectivity
curl https://$APP_URL/

# Test games API
curl https://$APP_URL/api/games

# Test specific slot game
curl -X POST https://$APP_URL/api/games/slots/init \
  -H "Content-Type: application/json" \
  -d '{"slotType": "video"}'
```

## 🆘 Troubleshooting

### Build Fails?

```bash
# Check build logs
oc logs -f bc/krissi-pimpin-pimpire

# Retry build
oc start-build krissi-pimpin-pimpire
```

### Pod Not Starting?

```bash
# Check pod logs
oc get pods
oc logs <pod-name>

# Describe pod for more info
oc describe pod <pod-name>
```

### Secret Issues?

```bash
# Check if secret exists
oc get secrets

# Verify secret content
oc get secret gemini-api-secret -o yaml
```

## 🎯 Recommended: Method 1 (Direct Deploy)

For the quickest deployment, use **Method 1** - it's the simplest and most reliable for Red Hat Sandbox.

Just run:

```bash
oc new-app nodejs~https://github.com/krissi2023/krissi-pimpin-pimpire.git --name=krissi-pimpin-pimpire
oc expose svc/krissi-pimpin-pimpire
```

And you're done! 🚀
