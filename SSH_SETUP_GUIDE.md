# SSH Setup Guide for Krissi Pimpin' Pimpire

## 🔑 Your SSH Key Details

**Public Key** (safe to share):

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyI0hoYKxQECgXIZxWT9OUvp+n5XlMYUHYatVYLaBO2 krist@pimpinempire
```

**Key Files Location**: `C:\Users\krist\.ssh\`

- **Private key**: `id_ed25519` ⚠️ (Never share!)
- **Public key**: `id_ed25519.pub` ✅ (Copy this to services)

## 📋 Setup Steps

### 1. Add SSH Key to GitHub

1. **Copy your public key** (already shown above)
2. **Go to GitHub**: <https://github.com/settings/keys>
3. **Click**: "New SSH key"
4. **Title**: `krist@pimpinempire - Windows Dev Machine`
5. **Key**: Paste the public key above
6. **Click**: "Add SSH key"

### 2. Start SSH Agent (Windows)

Open **PowerShell as Administrator** and run:

```powershell
# Set SSH agent to start automatically
Set-Service ssh-agent -StartupType Automatic

# Start the service
Start-Service ssh-agent

# Add your key to the agent
ssh-add C:\Users\krist\.ssh\id_ed25519
```

### 3. Test GitHub Connection

```bash
ssh -T git@github.com
```

Expected response:

```text
Hi krissi2023! You've successfully authenticated, but GitHub does not provide shell access.
```

## 🐋 Red Hat OpenShift Usage

### Access Running Pods

```bash
# List all pods
oc get pods

# Access pod terminal
oc exec -it <pod-name> -- /bin/bash

# Or use the simpler command
oc rsh <pod-name>
```

### Port Forwarding

```bash
# Forward local port to pod port
oc port-forward <pod-name> 8080:3000

# Access at http://localhost:8080
```

### Copy Files

```bash
# Copy TO pod
oc cp ./local-file <pod-name>:/app/remote-file

# Copy FROM pod  
oc cp <pod-name>:/app/logs ./local-logs
```

## 🔧 Troubleshooting

### SSH Key Not Working?

1. **Check key permissions**:

   ```bash
   # Private key should be 600 (owner read/write only)
   icacls C:\Users\krist\.ssh\id_ed25519 /inheritance:r /grant:r krist:F
   
   # Public key should be 644 (owner read/write, others read)
   icacls C:\Users\krist\.ssh\id_ed25519.pub /inheritance:r /grant:r krist:F /grant:r Everyone:R
   ```

2. **Generate new key if needed**:

   ```bash
   ssh-keygen -t ed25519 -C "krist@pimpinempire"
   ```

3. **Test SSH agent**:

   ```bash
   ssh-add -l  # List loaded keys
   ```

### Common OpenShift Commands

```bash
# Login to OpenShift
oc login --token=<your-token> --server=<server-url>

# Create project
oc new-project krissi-pimpin-pimpire

# Get all resources
oc get all

# Describe specific resource
oc describe deployment/krissi-pimpin-pimpire

# View logs
oc logs -f deployment/krissi-pimpin-pimpire

# Scale deployment
oc scale deployment/krissi-pimpin-pimpire --replicas=2
```

## 🎯 Quick Deploy Commands

Once SSH is working, you can use these commands for deployment:

```bash
# Clone your repo (if needed)
git clone git@github.com:krissi2023/krissi-pimpin-pimpire.git

# Deploy to OpenShift
oc new-app nodejs~git@github.com:krissi2023/krissi-pimpin-pimpire.git
oc expose svc/krissi-pimpin-pimpire

# Get your app URL
oc get route
```

## 🛡️ Security Best Practices

- ✅ **Never commit private keys** to Git
- ✅ **Use SSH agent** for key management  
- ✅ **Regular key rotation** (yearly)
- ✅ **Unique keys per machine/purpose**
- ⚠️ **Keep private keys encrypted** with passphrase
