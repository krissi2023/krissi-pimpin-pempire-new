# Red Hat Sandbox Deployment Guide

This guide will help you deploy the Krissi Pimpin' Pimpire gaming platform to Red Hat Sandbox (OpenShift).

## Prerequisites

1. **Red Hat Developer Account**: Sign up at <https://developers.redhat.com/>
2. **Red Hat Sandbox Access**: Access the sandbox at <https://developers.redhat.com/developer-sandbox>
3. **OpenShift CLI (oc)**: Download from your OpenShift console
4. **Docker/Podman**: For building container images

## Quick Start

### Step 1: Login to OpenShift

1. Go to your Red Hat Sandbox console
2. Click on your username (top right) → "Copy login command"
3. Click "Display Token" and copy the oc login command
4. Run the command in your terminal:

```bash
oc login --token=your_token --server=your_server_url
```

### Step 2: Create a New Project

```bash
oc new-project krissi-pimpin-pimpire
```

### Step 3: Set up Secrets and SSH Access

#### A. Gemini API Secret

Before deploying, you need to create the Gemini API secret:

1. Get your Gemini API key from <https://aistudio.google.com/app/apikey>
2. Encode it to base64:

   ```bash
   echo -n "your_api_key_here" | base64
   ```

3. Edit `.openshift/secret.yaml` and replace `your_base64_encoded_api_key_here` with your encoded key
4. Apply the secret:

   ```bash
   oc apply -f .openshift/secret.yaml
   ```

#### B. SSH Access Setup

Your SSH public key for accessing OpenShift containers and debugging:

**SSH Public Key** (add to authorized_keys on containers if needed):

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyI0hoYKxQECgXIZxWT9OUvp+n5XlMYUHYatVYLaBO2 krist@pimpinempire
```

**Location on your machine**: `C:\Users\krist\.ssh\`

- Private key: `id_ed25519` (keep secure!)
- Public key: `id_ed25519.pub`

**To access a running pod via SSH** (if SSH is enabled):

```bash
# First, get pod name
oc get pods

# Then access the pod
oc exec -it <pod-name> -- /bin/bash

# Or port forward for direct access
oc port-forward <pod-name> 2222:22
ssh -p 2222 -i ~/.ssh/id_ed25519 root@localhost
```

### Step 4: Clone Repository to Red Hat

#### A. Using HTTPS (Recommended for Red Hat Sandbox)

```bash
# Clone your repository using HTTPS
oc new-app https://github.com/krissi2023/krissi-pimpin-pimpire.git --name=krissi-pimpin-pimpire
oc expose svc/krissi-pimpin-pimpire
```

#### B. Using SSH (If SSH key is configured)

```bash
# Clone your repository using SSH
oc new-app git@github.com:krissi2023/krissi-pimpin-pimpire.git --name=krissi-pimpin-pimpire
oc expose svc/krissi-pimpin-pimpire
```

#### C. Manual Clone to Local, then Build

```bash
# Clone to your local machine first
git clone https://github.com/krissi2023/krissi-pimpin-pimpire.git
cd krissi-pimpin-pimpire

# Create new build from local source
oc new-build --binary --name=krissi-pimpin-pimpire
oc start-build krissi-pimpin-pimpire --from-dir=. --follow

# Deploy using configuration
oc apply -f .openshift/deployment.yaml
```

### Step 5: Build and Deploy

#### Option A: Using S2I (Source-to-Image)

```bash
oc new-app nodejs~https://github.com/krissi2023/krissi-pimpin-pimpire.git
oc expose svc/krissi-pimpin-pimpire
```

#### Option B: Using Dockerfile

```bash
# Build the image
oc new-build --binary --name=krissi-pimpin-pimpire
oc start-build krissi-pimpin-pimpire --from-dir=. --follow

# Deploy using our configuration
oc apply -f .openshift/deployment.yaml
```

### Step 6: Verify Deployment

```bash
# Check deployment status
oc get pods
oc get routes

# Get the application URL
oc get route krissi-pimpin-pimpire-route -o jsonpath='{.spec.host}'
```

## API Endpoints

Once deployed, your application will have the following endpoints:

### Main Endpoints

- `GET /` - Application info
- `GET /api/games` - Available games list

### Gemini AI Endpoints

- `GET /api/gemini/status` - Check AI service status
- `POST /api/gemini/generate` - Generate AI content
- `POST /api/gemini/chat` - AI chat interaction

### Game Endpoints

- `POST /api/games/slots/init` - Initialize slot game
- `POST /api/games/slots/{gameId}/spin` - Spin slots
- `POST /api/games/rps/init` - Initialize Rock Paper Scissors
- `POST /api/games/rps/{gameId}/play` - Play RPS
- `POST /api/games/poker/init` - Initialize Texas Hold'em
- `POST /api/games/blackjack/init` - Initialize Blackjack

## Testing Your Deployment

```bash
# Test basic connectivity
curl https://your-app-url/

# Test Gemini status
curl https://your-app-url/api/gemini/status

# Test game initialization
curl -X POST https://your-app-url/api/games/slots/init

# Test Rock Paper Scissors
curl -X POST https://your-app-url/api/games/rps/init
curl -X POST https://your-app-url/api/games/rps/{gameId}/play \
  -H "Content-Type: application/json" \
  -d '{"choice": "rock"}'
```

## Troubleshooting

### Common Issues

1. **Pod not starting**: Check logs with `oc logs pod-name`
2. **Route not accessible**: Verify route with `oc get routes`
3. **Gemini API errors**: Check if secret is properly configured
4. **SSH access denied**: Ensure your public key is properly configured

### SSH Troubleshooting

**Your SSH Details:**

- **Public Key**: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyI0hoYKxQECgXIZxWT9OUvp+n5XlMYUHYatVYLaBO2 krist@pimpinempire`
- **Key Location**: `C:\Users\krist\.ssh\id_ed25519`

**Common SSH Commands:**

```bash
# Test SSH connection to GitHub (verify key is working)
ssh -T git@github.com

# Access OpenShift pod directly
oc rsh <pod-name>

# Copy files to/from pod
oc cp local-file <pod-name>:/remote/path
oc cp <pod-name>:/remote/path ./local-file

# Debug network connectivity
oc exec -it <pod-name> -- curl -v https://api.github.com
```

**Add SSH key to GitHub** (if not already done):

1. Copy your public key: `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyI0hoYKxQECgXIZxWT9OUvp+n5XlMYUHYatVYLaBO2 krist@pimpinempire`
2. Go to <https://github.com/settings/keys>
3. Click "New SSH key"
4. Paste your public key
5. Save

### Useful Commands

```bash
# View application logs
oc logs -f deployment/krissi-pimpin-pimpire

# Describe deployment
oc describe deployment krissi-pimpin-pimpire

# Scale application
oc scale deployment krissi-pimpin-pimpire --replicas=2

# Delete and redeploy
oc delete -f .openshift/deployment.yaml
oc apply -f .openshift/deployment.yaml
```

## Environment Variables

The application supports the following environment variables:

- `NODE_ENV`: Set to 'production' for production deployment
- `GEMINI_API_KEY`: Your Google Gemini API key (set via secret)
- `PORT`: Application port (default: 3000)

## Security Considerations

1. **Never commit API keys**: Use OpenShift secrets for sensitive data
2. **HTTPS**: The route configuration enables TLS termination
3. **Resource limits**: Configured to prevent resource exhaustion
4. **Health checks**: Liveness and readiness probes are configured

## Updates and Maintenance

To update your application:

1. Update your code and push to Git
2. Rebuild the image: `oc start-build krissi-pimpin-pimpire`
3. The deployment will automatically update

For configuration changes:

1. Update the YAML files
2. Apply changes: `oc apply -f .openshift/deployment.yaml`

## Support

For issues with:

- **Red Hat Sandbox**: Check the Red Hat Developer documentation
- **This application**: Check the GitHub repository or create an issue
- **OpenShift**: Refer to the OpenShift documentation
