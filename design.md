# NeuroEase  System Design

## 1. Architecture Idea
The architecture is designed around a simple idea:

Instead of overengineering with complex infrastructure, we chose a serverless-first approach using AWS managed services. This keeps the system:
- Easier to reason about  
- Easier to scale  
- Easier to extend later  

---

## 2. One-Page AWS Architecture Diagram

Open with mermaid compiler:

graph TD
    %% Users
    U["End Users<br/>Web App / Browser Extension"]

    %% Frontend Layer
    U --> R53["Route 53 DNS"]
    R53 --> CF["CloudFront CDN"]
    CF --> S3FE["S3 Static Hosting<br/>React Frontend"]

    %% API Layer
    S3FE --> APIGW["API Gateway<br/>REST Endpoints"]

    %% Security & Auth
    APIGW --> Cognito["Cognito Auth<br/>JWT Tokens"]
    APIGW --> WAF["AWS WAF<br/>Basic Protection"]

    %% Core Backend
    APIGW --> LambdaContent["Lambda: Content Processing"]
    APIGW --> LambdaUser["Lambda: Users & Preferences"]
    APIGW --> LambdaFeedback["Lambda: Feedback Collection"]

    %% AI Layer
    LambdaContent --> Bedrock["Amazon Bedrock<br/>Summarization / Simplification"]
    LambdaContent --> Polly["AWS Polly<br/>Text-to-Speech"]

    %% Personalization Layer
    LambdaUser --> Personalize["Amazon Personalize<br/>(Optional for learning preferences)"]

    %% Data Layer
    LambdaUser --> DynamoUsers[("DynamoDB<br/>Users & Preferences")]
    LambdaFeedback --> DynamoFeedback[("DynamoDB<br/>Feedback")]
    LambdaContent --> S3Logs["S3<br/>Processed Content Logs"]

    %% Caching
    LambdaContent --> Redis["ElastiCache Redis<br/>Cache Frequent Results"]

    %% Observability
    APIGW --> CW["CloudWatch Logs & Metrics"]
    LambdaContent --> CW
    LambdaUser --> CW
    LambdaFeedback --> CW

    %% DevOps
    Dev["Developer"] --> CDK["CloudFormation / CDK"]
    CDK --> Infra["AWS Infrastructure"]


Link to the chart:
https://mermaid.ai/app/projects/79c84156-3b3e-44ac-bcc3-d26eec561826/diagrams/f27d5c17-ac56-468a-b019-0b1fe6718cb9/share/invite/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2N1bWVudElEIjoiZjI3ZDVjMTctYWM1Ni00NjhhLWIwMTktMGIxZmU2NzE4Y2I5IiwiYWNjZXNzIjoiVmlldyIsImlhdCI6MTc2OTI1MzQ1MX0.NxdOru23kTMDutZqaPjI9p1zgpgwI7j8y_4Dmn1RESs
