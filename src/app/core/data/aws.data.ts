import { Flashcard } from '../models/flashcard.model';

export const AWS_CARDS: Flashcard[] = [
  {
    id: 'aws-1',
    question: 'What are the core AWS compute services?',
    answer: 'EC2 (virtual servers), Lambda (serverless functions), ECS/EKS (containers), Elastic Beanstalk (PaaS). EC2 for full control, Lambda for event-driven, containers for microservices.',
    codeExample: `// AWS Lambda function example
exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event));
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      input: event
    })
  };
  
  return response;
};

// Trigger sources:
// - API Gateway (HTTP requests)
// - S3 (file uploads)
// - DynamoDB Streams
// - SQS (message queues)
// - CloudWatch Events (scheduled)`,
    technology: 'aws',
    category: 'Compute',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-2',
    question: 'What is S3 and what are storage classes?',
    answer: 'S3 is object storage with 99.999999999% durability. Storage classes: Standard (frequent access), IA (infrequent), Glacier (archive), Intelligent-Tiering (auto-optimize). Use lifecycle policies.',
    codeExample: `// S3 Storage Classes
Standard           - Frequent access, milliseconds
Standard-IA        - Infrequent, lower cost, retrieval fee
One Zone-IA        - Single AZ, 20% cheaper
Glacier Instant    - Archive, milliseconds retrieval
Glacier Flexible   - Archive, minutes to hours
Glacier Deep       - Cheapest, 12+ hours retrieval

// Lifecycle policy example
{
  "Rules": [{
    "ID": "ArchiveOldFiles",
    "Status": "Enabled",
    "Transitions": [
      { "Days": 30, "StorageClass": "STANDARD_IA" },
      { "Days": 90, "StorageClass": "GLACIER" }
    ],
    "Expiration": { "Days": 365 }
  }]
}`,
    technology: 'aws',
    category: 'Storage',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-3',
    question: 'What is the difference between SQS and SNS?',
    answer: 'SQS is a message QUEUE (pull-based, one consumer). SNS is pub/sub (push-based, multiple subscribers). Use SQS for decoupling, SNS for fan-out. Often combined: SNS -> SQS.',
    codeExample: `// SQS - Queue (Pull)
Producer -> [Queue] -> Consumer
- Messages persist until processed
- One consumer per message
- Great for decoupling services

// SNS - Pub/Sub (Push)
Publisher -> [Topic] -> Subscriber 1
                    -> Subscriber 2
                    -> Subscriber 3
- Fan-out pattern
- Push to: SQS, Lambda, HTTP, Email, SMS

// Common pattern: SNS + SQS
API -> SNS Topic -> SQS Queue 1 -> Service A
                 -> SQS Queue 2 -> Service B
                 -> Lambda      -> Process`,
    technology: 'aws',
    category: 'Messaging',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-4',
    question: 'What are VPC, subnets, and security groups?',
    answer: 'VPC is your isolated network. Subnets divide VPC (public = internet, private = internal). Security Groups are instance firewalls (stateful). NACLs are subnet firewalls (stateless).',
    codeExample: `// VPC Architecture
VPC (10.0.0.0/16)
├── Public Subnet (10.0.1.0/24)
│   ├── Internet Gateway (IGW)
│   ├── NAT Gateway
│   └── Load Balancer
├── Private Subnet (10.0.2.0/24)
│   └── Application Servers
└── Private Subnet (10.0.3.0/24)
    └── Database Servers

// Security Group (Stateful)
Inbound:  Port 443 from 0.0.0.0/0
Outbound: All traffic (auto-allowed return)

// NACL (Stateless)
Inbound:  Allow 443 from 0.0.0.0/0
Outbound: Must explicitly allow return traffic`,
    technology: 'aws',
    category: 'Networking',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-5',
    question: 'What is IAM and how do policies work?',
    answer: 'IAM manages users, groups, roles, and policies. Policies are JSON documents with Effect, Action, Resource. Use roles for services, least-privilege principle. Never use root account.',
    codeExample: `// IAM Policy Structure
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",     // or "Deny"
    "Action": [
      "s3:GetObject",
      "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::my-bucket/*",
    "Condition": {
      "IpAddress": {
        "aws:SourceIp": "192.168.1.0/24"
      }
    }
  }]
}

// Best Practices:
// - Use Roles for EC2, Lambda (not access keys)
// - Groups for users with same permissions
// - MFA on all human users
// - Regular access key rotation`,
    technology: 'aws',
    category: 'Security',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-6',
    question: 'What are the main AWS database options?',
    answer: 'RDS (managed relational), DynamoDB (NoSQL key-value), Aurora (MySQL/PostgreSQL compatible), ElastiCache (Redis/Memcached), Redshift (data warehouse), DocumentDB (MongoDB compatible).',
    codeExample: `// When to use each:

RDS (PostgreSQL, MySQL, SQL Server)
- Traditional relational data
- Complex queries, joins
- ACID transactions

DynamoDB
- Key-value / document
- Massive scale, low latency
- Simple access patterns

Aurora
- MySQL/PostgreSQL compatible
- 5x faster than RDS MySQL
- Auto-scaling storage

ElastiCache (Redis)
- Session storage
- Caching layer
- Real-time leaderboards

Redshift
- Data warehouse
- Analytics, BI
- Petabyte scale`,
    technology: 'aws',
    category: 'Database',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-7',
    question: 'What is CloudFormation and Infrastructure as Code?',
    answer: 'CloudFormation defines AWS resources in YAML/JSON templates. Enables version control, repeatable deployments, drift detection. Alternative: Terraform (multi-cloud), CDK (code-based).',
    codeExample: `# CloudFormation Template
AWSTemplateFormatVersion: '2010-09-09'
Description: Simple web server

Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0abc123
      InstanceType: t3.micro
      SecurityGroups:
        - !Ref WebSecurityGroup
      UserData:
        Fn::Base64: |
          #!/bin/bash
          yum install -y httpd
          systemctl start httpd

  WebSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow HTTP
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0

Outputs:
  PublicIP:
    Value: !GetAtt WebServer.PublicIp`,
    technology: 'aws',
    category: 'DevOps',
    difficulty: 'hard',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-8',
    question: 'What is Route 53 and what routing policies exist?',
    answer: 'Route 53 is DNS service. Policies: Simple (single resource), Weighted (% distribution), Latency (closest region), Failover (active-passive), Geolocation (by country/region).',
    codeExample: `// Route 53 Routing Policies

Simple
- Single resource
- Returns all values randomly

Weighted
- Distribute traffic by weight
  A: 70%, B: 30%
- A/B testing, gradual migration

Latency
- Route to lowest latency region
- Great for global apps

Failover
- Primary + Secondary
- Health checks trigger failover

Geolocation
- Route by user location
- Compliance, localization

Geoproximity
- Route by distance + bias
- Shift traffic between regions`,
    technology: 'aws',
    category: 'Networking',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-9',
    question: 'What is the Well-Architected Framework?',
    answer: 'AWS best practices across 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability. Use for architecture reviews.',
    codeExample: `// 6 Pillars of Well-Architected

1. OPERATIONAL EXCELLENCE
   - Automate changes
   - Respond to events
   - Define standards

2. SECURITY
   - Identity & access management
   - Detection, protection
   - Data encryption

3. RELIABILITY
   - Recover from failures
   - Scale horizontally
   - Stop guessing capacity

4. PERFORMANCE EFFICIENCY
   - Use right resource types
   - Monitor performance
   - Use serverless

5. COST OPTIMIZATION
   - Eliminate waste
   - Reserved/Spot instances
   - Right-sizing

6. SUSTAINABILITY
   - Minimize environmental impact
   - Maximize utilization`,
    technology: 'aws',
    category: 'Architecture',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'aws-10',
    question: 'What is API Gateway and how does it work with Lambda?',
    answer: 'API Gateway creates REST/WebSocket APIs. Handles auth, throttling, caching, CORS. Integrates with Lambda for serverless APIs. Supports stages (dev, prod) and custom domains.',
    codeExample: `// Serverless API Architecture

Client -> API Gateway -> Lambda -> DynamoDB

// API Gateway features:
- Request/response transformation
- Request validation
- API keys & usage plans
- Rate limiting & throttling
- Caching (reduce Lambda calls)
- Custom domain + SSL

// SAM Template example
Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs18.x
      Events:
        HelloAPI:
          Type: Api
          Properties:
            Path: /hello
            Method: get`,
    technology: 'aws',
    category: 'API',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
