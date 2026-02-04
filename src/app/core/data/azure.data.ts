import { Flashcard } from '../models/flashcard.model';

export const AZURE_CARDS: Flashcard[] = [
  {
    id: 'azure-1',
    question: 'What are the core Azure compute services?',
    answer: 'Virtual Machines (IaaS), App Service (PaaS for web apps), Azure Functions (serverless), AKS (Kubernetes), Container Instances. Choose based on control vs. management needs.',
    codeExample: `// Azure Compute Options

Virtual Machines       - Full control, any OS
App Service           - Managed web hosting
  - Web Apps          - HTTP-based apps
  - API Apps          - REST APIs
  - Mobile Apps       - Mobile backends
Azure Functions       - Serverless, event-driven
Container Instances   - Quick container runs
AKS                   - Managed Kubernetes

// Azure Function example (C#)
[FunctionName("HttpTrigger")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, 
     "get", "post")] HttpRequest req,
    ILogger log)
{
    log.LogInformation("C# HTTP trigger processed");
    return new OkObjectResult("Hello from Azure!");
}`,
    technology: 'azure',
    category: 'Compute',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-2',
    question: 'What are Azure storage options?',
    answer: 'Blob Storage (objects), File Storage (SMB shares), Queue Storage (messages), Table Storage (NoSQL), Disk Storage (VMs). Tiers: Hot, Cool, Archive. Use for different access patterns.',
    codeExample: `// Azure Storage Types

Blob Storage (Objects)
├── Block Blobs    - Files, images, videos
├── Append Blobs   - Logs, streaming
└── Page Blobs     - VM disks

File Storage       - SMB file shares
Queue Storage      - Message queuing
Table Storage      - NoSQL key-value

// Access Tiers
Hot      - Frequent access, higher storage cost
Cool     - Infrequent (30+ days), lower storage
Archive  - Rare access, lowest cost, hours to retrieve

// Blob SDK example (C#)
BlobServiceClient client = new(connectionString);
BlobContainerClient container = 
    client.GetBlobContainerClient("mycontainer");
await container.UploadBlobAsync("file.txt", content);`,
    technology: 'azure',
    category: 'Storage',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-3',
    question: 'What is Azure Active Directory (Entra ID)?',
    answer: 'Azure AD (now Entra ID) is cloud identity service. Handles SSO, MFA, conditional access, B2B/B2C. Integrates with Microsoft 365, thousands of SaaS apps. Not same as on-prem AD.',
    codeExample: `// Azure AD / Entra ID Features

Authentication
├── Single Sign-On (SSO)
├── Multi-Factor Auth (MFA)
├── Passwordless (FIDO2, Phone)
└── Conditional Access

Identity Types
├── Users (employees)
├── Groups (permissions)
├── Service Principals (apps)
└── Managed Identities (Azure resources)

// OAuth 2.0 Flow for App Auth
1. User clicks "Sign in with Microsoft"
2. Redirect to login.microsoftonline.com
3. User authenticates + consents
4. Azure AD returns tokens
5. App validates JWT token

// Token includes: sub, name, roles, aud, iss`,
    technology: 'azure',
    category: 'Security',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-4',
    question: 'What are Azure SQL and Cosmos DB?',
    answer: 'Azure SQL is managed SQL Server. Cosmos DB is globally distributed NoSQL with multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table). Cosmos offers single-digit ms latency worldwide.',
    codeExample: `// Azure Database Options

Azure SQL Database
- Managed SQL Server
- DTU or vCore pricing
- Elastic pools for multi-tenant
- Auto-tuning, backups

Azure Cosmos DB
- Multi-model NoSQL
- Global distribution
- 5 consistency levels:
  Strong -> Bounded -> Session -> Prefix -> Eventual
- < 10ms reads/writes

// Cosmos DB SQL API
SELECT c.name, c.email
FROM c
WHERE c.type = "user"
AND c.status = "active"

// Partitioning is KEY
- Choose partition key wisely
- Distribute data evenly
- /userId, /tenantId common`,
    technology: 'azure',
    category: 'Database',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-5',
    question: 'What is Azure DevOps and its components?',
    answer: 'Azure DevOps is a suite: Boards (work tracking), Repos (Git), Pipelines (CI/CD), Test Plans, Artifacts (packages). Alternative: GitHub Actions with Azure integration.',
    codeExample: `// Azure DevOps Services

Azure Boards    - Kanban, sprints, backlog
Azure Repos     - Git repositories
Azure Pipelines - CI/CD automation
Azure Artifacts - Package feeds (npm, NuGet)
Azure Test Plans - Manual/exploratory testing

// azure-pipelines.yml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

stages:
  - stage: Build
    jobs:
      - job: BuildApp
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
          - script: npm install && npm run build
          - publish: $(Build.ArtifactStagingDirectory)
  
  - stage: Deploy
    jobs:
      - deployment: DeployWeb
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: AzureWebApp@1`,
    technology: 'azure',
    category: 'DevOps',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-6',
    question: 'What is Azure Virtual Network (VNet)?',
    answer: 'VNet is isolated network in Azure. Contains subnets, has NSGs (firewalls), supports peering (connect VNets), VPN Gateway (on-prem connection), Private Endpoints (private Azure access).',
    codeExample: `// Azure VNet Architecture

VNet (10.0.0.0/16)
├── Subnet: Web (10.0.1.0/24)
│   └── NSG: Allow 80, 443
├── Subnet: App (10.0.2.0/24)
│   └── NSG: Allow from Web subnet
├── Subnet: Data (10.0.3.0/24)
│   └── NSG: Allow from App subnet
└── Subnet: AzureBastionSubnet
    └── Secure RDP/SSH access

// Network Security Group Rule
{
  "name": "AllowHTTPS",
  "priority": 100,
  "direction": "Inbound",
  "access": "Allow",
  "protocol": "Tcp",
  "sourceAddressPrefix": "*",
  "destinationPortRange": "443"
}

// Private Endpoints = Private IP for Azure services`,
    technology: 'azure',
    category: 'Networking',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-7',
    question: 'What is Azure Resource Manager (ARM)?',
    answer: 'ARM is deployment/management layer. All Azure tools use ARM API. Resources organized in Resource Groups. ARM templates (JSON) or Bicep for Infrastructure as Code.',
    codeExample: `// ARM vs Bicep

// ARM Template (JSON) - verbose
{
  "type": "Microsoft.Storage/storageAccounts",
  "apiVersion": "2021-02-01",
  "name": "[parameters('storageAccountName')]",
  "location": "[resourceGroup().location]",
  "sku": { "name": "Standard_LRS" },
  "kind": "StorageV2"
}

// Bicep (simpler syntax)
resource storage 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: storageAccountName
  location: resourceGroup().location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}

// Resource Group = logical container
// - Same lifecycle (deploy/delete together)
// - Same region (usually)
// - RBAC at group level`,
    technology: 'azure',
    category: 'DevOps',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-8',
    question: 'What is Azure Service Bus vs Event Grid vs Event Hubs?',
    answer: 'Service Bus: enterprise messaging with queues/topics. Event Grid: reactive event routing. Event Hubs: big data streaming (millions/sec). Choose based on pattern and scale.',
    codeExample: `// Azure Messaging Services

SERVICE BUS (Enterprise Messaging)
- Queues (point-to-point)
- Topics (pub/sub, filters)
- Sessions, dead-lettering
- Use for: order processing, workflows

EVENT GRID (Event Routing)
- Reactive, push-push
- Built-in Azure events
- Custom topics
- Use for: resource changes, webhooks

EVENT HUBS (Big Data Streaming)
- Millions events/second
- Kafka compatible
- Partitions for parallelism
- Use for: telemetry, logs, analytics

// Pattern Example
IoT Devices -> Event Hubs -> Stream Analytics
                          -> Data Lake
Azure Resources -> Event Grid -> Functions
                              -> Logic Apps`,
    technology: 'azure',
    category: 'Messaging',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-9',
    question: 'What is Azure Key Vault?',
    answer: 'Key Vault securely stores secrets, keys, and certificates. Supports HSM-backed keys. Integrates with Azure services via Managed Identity. Essential for zero-trust security.',
    codeExample: `// Azure Key Vault Usage

Stores:
- Secrets (connection strings, API keys)
- Keys (encryption keys, HSM-backed)
- Certificates (SSL/TLS certs)

// Access from App (C#)
var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net/"),
    new DefaultAzureCredential()
);

KeyVaultSecret secret = await client
    .GetSecretAsync("DatabasePassword");
string password = secret.Value;

// Best Practice: Managed Identity
1. Enable Managed Identity on App Service
2. Grant "Key Vault Secrets User" role
3. No credentials in code!

// Reference in App Settings
@Microsoft.KeyVault(VaultName=myvault;
  SecretName=DbPassword)`,
    technology: 'azure',
    category: 'Security',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'azure-10',
    question: 'What is Azure Monitor and Application Insights?',
    answer: 'Azure Monitor collects metrics/logs from all Azure resources. Application Insights is APM for apps: request tracking, dependencies, exceptions, custom telemetry. Use KQL for queries.',
    codeExample: `// Azure Monitoring Stack

Azure Monitor
├── Metrics (numeric, near real-time)
├── Logs (Log Analytics, KQL queries)
├── Alerts (metric, log, activity)
└── Workbooks (visualizations)

Application Insights
├── Request tracking
├── Dependency calls (SQL, HTTP)
├── Exceptions & stack traces
├── Custom events/metrics
└── Live Metrics Stream

// KQL Query Example
requests
| where timestamp > ago(24h)
| where success == false
| summarize count() by bin(timestamp, 1h)
| render timechart

// Custom telemetry (C#)
telemetryClient.TrackEvent("OrderPlaced", 
    new Dictionary<string, string> {
        { "OrderId", orderId }
    });`,
    technology: 'azure',
    category: 'Monitoring',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
