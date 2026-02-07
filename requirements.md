# NeuroEase  Requirements

## 1. Overview
NeuroEase is an accessibility-focused platform that helps neurodivergent users (such as people with ADHD, Autism, and Dyslexia) consume digital content more comfortably. The idea came from noticing how overwhelming most websites feel when you struggle with focus, reading load, or sensory overload.

Instead of trying to build everything at once, this project focuses on a realistic MVP that demonstrates strong impact using AWS-managed services.

---

## 2. The Problem We are Solving
Most websites today are designed for neurotypical users. That creates real issues like:
- Long blocks of text that are hard to process  
- Visual clutter that makes it difficult to focus  
- Poor support for users who need simplified language  
- Accessibility tools that feel like afterthoughts  

The result: many users are technically online but still excluded from meaningful access.

NeuroEase tries to solve this by adapting content dynamically instead of forcing users to adapt themselves.

---

## 3. Project Goals
For this hackathon, the goals are intentionally focused:
- Make content easier to understand  
- Reduce cognitive load while reading  
- Allow users to customize how content appears  
- Respect privacy and avoid dark-pattern data usage  
- Build something that could realistically run on AWS  

---

## 4. Who This Is For
We designed this with real people in mind:
- Students who struggle with attention and comprehension  
- Professionals who get overwhelmed by dense information  
- Neurodivergent creators and entrepreneurs  
- Educators supporting diverse learners  

These personas helped shape which features mattered most.

---

## 5. What the System Should Do

### User & Preferences
- Users can sign up using email or OAuth  
- Users can adjust things like:
  - Font size  
  - Contrast mode  
  - Summary depth  
  - Reading mode  
- These preferences are saved so users don’t need to reconfigure every time  

### Content Adaptation
Core MVP features:
- Summarize long content  
- Simplify complex text  
- Highlight key points  
- Provide text-to-speech using AWS Polly  
- Offer a distraction-free reading view  

We intentionally focused on text-first features because they are high impact and feasible within hackathon scope.

### Personalization
- Users can rate whether an output was helpful  
- The system uses this feedback to adjust future outputs  
- Users always retain manual control (no forced black box behavior)

### Platform Scope
- Web app is the primary MVP  
- Browser extension is a stretch goal  
- Mobile app is planned for future work  

---

## 6. Non-Functional Expectations

### Performance
We are not optimizing for millisecond-level latency, but:
- Responses should feel reasonably fast (2 to 3 seconds typical)  
- The UI should feel smooth and responsive  

### Scalability
The system should:
- Work for small usage during the hackathon  
- Still make architectural sense if usage grows  

That is why we chose AWS managed services over self-managed infrastructure.

### Security & Privacy
- All communication uses HTTPS  
- No unnecessary data collection  
- Users should feel in control of their data  
- Sensitive data is encrypted when stored  

### Accessibility
We aim to follow WCAG 2.1 AA principles:
- Keyboard navigation  
- Screen reader compatibility  
- Readable contrast  
- Clear visual hierarchy  

---

## 7. AWS Services Used (By Design)
This project intentionally aligns with AWS tooling:
- S3 + CloudFront for frontend hosting  
- API Gateway for APIs  
- Lambda for backend logic  
- DynamoDB for user data  
- Cognito for authentication  
- Bedrock (or SageMaker) for AI inference  
- Polly for text-to-speech  
- CloudWatch for logging and monitoring  

These choices were made to balance realism, scalability, and hackathon feasibility.

---

## 8. Constraints We Acknowledge
- Limited development time  
- Limited cloud budget  
- MVP focuses on text, not full multimodal AI  
- Many advanced features are future-facing rather than implemented  

This is intentional rather than accidental.

---

## 9. How We Measure Success
Instead of vanity metrics, success looks like:
- Users saying content feels easier to understand  
- Users spending less time struggling with dense text  
- Judges seeing this as feasible, thoughtful, and impactful