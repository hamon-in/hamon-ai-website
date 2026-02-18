---
2026-02-18
# Initializing Transmission
First dispatch from the Hamon network. On building AI agents that actually think, reason, and act autonomously.

The age of passive AI tools is over. What comes next are systems that don't just respond — they *initiate*. Agents that observe, plan, and execute multi-step workflows without hand-holding.

We've been building these systems for a while now. Not chatbots. Not copilots. Fully autonomous agents deployed inside real businesses, handling real operations — from data pipeline orchestration to customer interaction flows.

## What makes an agent different?

A tool waits for input. An agent has *intent*. It maintains context across interactions, breaks complex goals into sub-tasks, uses tools dynamically, and self-corrects when things go wrong.

The technical stack matters less than the architecture:
- **Memory**: Long-term and working memory that persists across sessions
- **Planning**: Ability to decompose goals into executable steps
- **Tool use**: Dynamic selection and invocation of APIs, databases, and services
- **Reflection**: Self-evaluation loops that catch errors before they propagate

## Why now?

Foundation models have crossed a capability threshold. With the right scaffolding — retrieval systems, execution environments, feedback loops — you can build agents that handle 80% of knowledge work autonomously.

The remaining 20% is where humans add irreplaceable value: judgment, creativity, and ethical oversight.

We're not replacing people. We're removing the bottleneck between *knowing what to do* and *getting it done*.
---
2025-09-15
# DBT Demystified: Transforming Data Like a Pro Inside Your Warehouse
Making data less messy, one model at at time.

In the world of modern analytics, data rarely arrives in a perfect, ready-to-analyze state.

It’s messy. It’s scattered. And it usually comes with a few “creative” column names like `cust_nm` or `order_dt` that no one really understands.

Traditionally, we solved this mess with **ETL** (Extract, Transform, Load). But the game has changed.

Now, **ELT** (Extract, Load, *then* Transform) rules the modern data stack and **dbt** is the engine that makes the "T" happen.

## **So… What is dbt?**

**dbt** (Data Build Tool) is an open-source framework that lets you transform raw data into clean, analytics-ready datasets **inside** your data warehouse.

You write your transformations in SQL, sprinkle in some Jinja templating for automation, and dbt handles:

- Building tables/views

- Figuring out the order to run them

- Testing data quality

- Generating documentation

- And even version-controlling everything via Git

Think of it as the **software engineering toolkit for analytics engineers** bringing code versioning, modular design, and testing into the data world.

## **Why We Needed dbt**

In the old ETL model:

- Transformations happened **before** the data even hit the warehouse.

- Logic was hidden in pipelines or scripts, making it hard to debug or modify.

- Data teams spent more time **finding** and **fixing** transformations than analyzing data.

With dbt’s ELT approach:

- Raw data lands in the warehouse **unchanged**.

- Transformations are **transparent, documented, and versioned**.

- Analysts and engineers speak the same SQL-based language.

## **How dbt Works (Without the Buzzwords)**

Let’s say you’re a travel company and you have:

- A `raw_bookings` table from your booking system

- A `raw_customers` table from your CRM

You want a clean dataset that shows **total bookings by customer**.

In dbt, you’d:

- Create a **model** called `clean_bookings.sql` to fix column names, formats, and filter invalid rows.

- Create a **model** called `customer_bookings.sql` that joins `clean_bookings` to `raw_customers`.

- Use the `ref()` function instead of hardcoding table names, like:

```
sql

-- models/customer_bookings.sql
select
    c.customer_id,
    c.full_name,
    count(b.booking_id) as total_bookings
from {{ ref('clean_bookings') }} b
join {{ ref('raw_customers') }} c
  on b.customer_id = c.customer_id
group by 1, 2

```

When you run `dbt run`, it:

- Figures out that `customer_bookings` depends on `clean_bookings`.

- Builds them in the right order.

- Creates views or tables directly in your warehouse.

## **The Magic Sauce: dbt’s Features**

- **Modular SQL** – Break big transformations into small, reusable steps.

- **Jinja Templating** – Use variables, loops, and macros to avoid repetitive code.

- **Dependency Graph (DAG)** – Automatically manages the order of execution.

- **Testing** – Ensure data quality with built-in tests like `not_null` and `unique`.

- **Documentation** – Auto-generates searchable docs with lineage diagrams.

- **Version Control** – Store all transformations in Git for collaboration and history.

## **5. Why dbt is a Game-Changer for Teams**

With dbt, transformations aren’t hidden in black-box pipelines. They’re:

- **Readable** – anyone who knows SQL can understand them.

- **Versioned** – so you know exactly who changed what, and when.

- **Tested** – no more nasty surprises in dashboards.

- **Deployable** – works with CI/CD so you can automate production runs.

## **Getting Started (The Quick Version)**

**Install dbt** for your warehouse:

```
bash

pip install dbt-bigquery
# or dbt-snowflake, dbt-redshift, dbt-postgres

```

**Initialize a project**:

```
bash

dbt init sample_project
cd sample_project

```

**Add your first model** in `/models`:

```
sql

-- models/clean_bookings.sql
select
    booking_id,
    customer_id,
    cast(booking_date as date) as booking_date
from dataset_name.raw_bookings
where booking_id is not null

```

**Run it**:

```
bash

dbt run

```

**Test it**:

```
yaml

# models/schema.yml
version: 2
models:
  - name: clean_bookings
    tests:
      - not_null:
          column_name: booking_id

```

```
bash

dbt test

```

## **Best Practices**

- **Always use `ref()`** – it makes your project portable across environments.

- **Name models consistently** – e.g., `stg_` for staging, `dim_` for dimensions, `fct_` for facts.

- **Keep models small** – one transformation purpose per file.

- **Test early and often** – catch issues before they hit dashboards.

- **Document as you go** – future-you will thank you.

## **Final Thoughts**

dbt isn’t just another data tool. It’s a mindset shift. It brings **software engineering discipline** into data analytics, making transformations:

- Transparent

- Testable

- Maintainable

Whether you’re cleaning customer records, reconciling payment data, or building marketing funnels, dbt can make the process faster, cleaner, and more reliable.

If you’ve ever wished your SQL transformations were easier to manage, debug, and share, dbt is worth your attention.

📌 **Resources**:

- [dbt Developer Hub](https://docs.getdbt.com/)

- [dbt Community](https://www.getdbt.com/community)
---
2025-02-18
# HPCINFRA — Creating the initial Version
[](https://medium.com/@rohithv?source=post_page---byline--9d359fc625ac---------------------------------------)

**What is HPCINFRA**

At [**HPC Infra**](https://www.hpcinfra.com/), we are revolutionizing the chip development ecosystem by providing a cloud-agnostic, scalable infrastructure stack that integrates seamlessly with your existing tools and workflows. Whether you’re running on-prem, cloud, or hybrid environments, we ensure flexibility, lower costs, and faster time-to-market

**What the Platform Does**

The Platform distributes high-performance workloads across multiple machines and make them run faster.

**Building a SLURM Cluster on AWS: A Journey from Manual Setup to Automated Deployment**

So we recently embarked on a journey to create a SLURM cluster on AWS, evolving it from a basic manual setup to a fully automated, library-driven solution. Here’s my story of how we transformed a basic cluster into a production-ready system.

**Quick Tech Overview:**

- **SLURM**: An open-source job scheduler for Linux that manages and schedules computing tasks across multiple machines.

- **AWS (Amazon Web Services)**: A cloud platform providing on-demand computing resources and services.

- **Terraform**: Infrastructure-as-Code tool to create and manage cloud resources through code.

- **Ansible**: Automation tool for configuring servers and deploying applications.

**Initial Manual Setup**

Having worked with AWS before, we started with the basics: manually creating EC2 instances. After diving into the SLURM documentation, we learned that we needed at least two machines: one to serve as the controller (slurmctld) and another as the compute node (slurmd).

We launched two Ubuntu 22.04 LTS instances and began the setup process. The head node got slurmctld, while the compute node received slurmd. The real challenge came in establishing communication between these nodes. To facilitate this and ensure proper job handling, we implemented shared storage mounted across all nodes to store job results.

**First Success and Moving Towards Automation**

After getting the basic configuration right, we ran a sample job — and it worked! This success was exciting, but we knew manual setup wouldn’t scale. That’s when we turned to infrastructure as code, using Terraform for provisioning and Ansible for configuration management.

**Creating a Reusable Solution**

The next evolution was developing a Python library that abstracted away all the complexity. The library allowed users to create SLURM clusters by simply specifying three parameters:

- Machine size

- Number of nodes

- Shared storage size

To optimize deployment speed, we created custom AMIs for both compute and head nodes. This dramatically reduced cluster startup time to just minutes, making it practical for on-demand use.

**Enhanced Features and Monitoring**

We wanted to track cluster usage, so we implemented job logging to an RDS instance. Instead of setting up the more complex slurmdbd and SLURM REST API, we opted for a simpler solution: a Python script that captures and stores job-related environment variables. This gave us the monitoring we needed without the overhead of maintaining additional SLURM components.

**AI-Powered Cluster Interface**

To make the cluster even more user-friendly, we integrated an AI chatbot using OpenAI’s function calling capabilities. This addition transformed how users interact with the cluster:

**User**: “Show me the status of my recent jobs”**Bot**: *Here are the statuses of your recent jobs:1. Job ID 26 — Name: testjob1 — Status: COMPLETED2. Job ID 25 — Name: testjob2— Status: COMPLETEDIf you need more details about any specific job, feel free to ask!*

**User**: “Which projects are currently active?”**Bot**: *Your currently active project is:1. Example Project — This is an Example Project. — ACTIVEIf you need more details about this project, feel free to ask!*

The chatbot handles common queries through predefined function calls, making cluster management more intuitive. Instead of remembering specific commands or navigating through interfaces, users can simply ask questions in natural language. The system is designed to be extensible — as we add more functionality to the cluster, we can easily expand the chatbot’s capabilities by adding new function definitions.

**User Management and Final Form**

The last piece of the puzzle was adding multi-user support. We extended our library to include functions for adding new users’ public keys to the cluster, making it truly multi-tenant capable.

**The End Result**

What started as a manual two-node setup evolved into a solution with:

- Single-function cluster provisioning

- Automated configuration management

- Quick startup using custom AMIs

- Job logging and monitoring

- Multi-user support

- Flexible node scaling

The entire system can now be deployed with minimal input, making SLURM cluster creation accessible to teams without deep AWS or SLURM expertise. What’s particularly satisfying is how we maintained simplicity while building a production-grade system — everything from cluster creation to user management can be handled through simple library calls.

This journey taught me that while building a basic SLURM cluster is straightforward, creating a production-ready system requires careful consideration of automation, monitoring, and user management. By focusing on simplicity and user experience, we created a solution that makes high-performance computing more accessible to our entire organization.
---
2024-11-25
# CloudStack on Raspberry Pi 5s: A Learning Experience
Like many tech enthusiasts, we were excited to experiment with CloudStack on some affordable hardware. Our journey began with four shiny new Raspberry Pi 5s and a dream of creating a mini cloud infrastructure. Here’s how it went.

**Setting Up the Pi Cluster (Bramble)**

Our first step was to create a cluster using my Raspberry Pis, commonly known as a “bramble” in the Pi community. Following the excellent guide on the [official Raspberry Pi website](https://www.raspberrypi.com/tutorials/cluster-raspberry-pi-tutorial/), we set up the cluster with one Pi designated as the head node. The initial clustering process went smoothly, and we were thrilled to see all four Pis working together as one unit.

**Overcoming Hardware Issues**

During the setup, we encountered an interesting challenge — one of our Raspberry Pis had a bricked WiFi module. Rather than letting this derail our progress, we came up with a simple yet effective solution: we took the SD card from the problematic Pi and moved it to a working Pi. This quick thinking allowed us to continue building our bramble without having to wait for replacement hardware. It’s a good reminder that sometimes the simplest solutions are the most effective!

**Attempting CloudStack Implementation**

With our bramble up and running, We moved on to the next challenge: installing CloudStack. We followed Rohit Yadav’s comprehensive guide on [setting up CloudStack with ARM64 KVM](https://rohityadav.cloud/blog/cloudstack-arm64-kvm/). The installation was successful, and we were initially optimistic about our mini-cloud setup.

**The Reality Check**

However, We soon hit a significant roadblock. While trying to instantiate virtual machines, We encountered capacity issues. The Raspberry Pi 5, despite having a capable ARM Cortex-A76 processor that theoretically supports virtualization, proved challenging to configure properly for our CloudStack implementation. While KVM support is possible on the Pi 5’s hardware, getting it to work correctly with CloudStack in our specific setup presented unexpected hurdles.

**The Solution: Moving to Standard Hardware**

After troubleshooting and attempting various configurations, we pivoted to a more conventional approach. we migrated the entire setup to a modern laptop, where the virtualization stack was better documented and supported. The VMs created smoothly, and we finally had a working CloudStack environment.

**Lessons Learned**

This experience taught us valuable lessons about setting up cloud infrastructure. While the Raspberry Pi 5 is a powerful and capable device, implementing enterprise-grade software like CloudStack requires careful consideration of hardware compatibility, system configurations, and virtualization requirements. Sometimes, choosing more conventional hardware, where there’s extensive documentation and community support, can save considerable time and effort in achieving your goals. thus

**Next Steps**

While the laptop setup serves as a great proof of concept, our next step is to scale up to dedicated servers with substantial computational resources. We’re in the process of acquiring high-performance servers that will provide the necessary CPU, memory, and storage capabilities for a robust CloudStack deployment. This will allow us to move beyond experimentation and create a more production-ready environment capable of handling more demanding workloads and a larger number of virtual machines.

**Technical Note**

For those interested in attempting a similar setup, it’s worth noting that the Raspberry Pi 5’s ARM Cortex-A76 cores do support hardware virtualization. However, successful KVM implementation depends on multiple factors including:

- The Linux kernel version being used

- Proper enabling of virtualization modules

- The specific OS distribution running on the Pi

- System configuration settings

You can check your Pi’s virtualization support using commands like:

```
lscpu | grep Virtualization
```

or

```
ls /dev/kvm
```
---
2025-03-19
# GitHub-Powered AWS Lambda Lifecycle Management: A Path-Based Approach
In the world of serverless computing, AWS Lambda functions have become essential building blocks for modern applications. As your serverless architecture grows, managing the complete lifecycle of these functions becomes increasingly important. This post explores how GitHub can serve as the foundation for efficient Lambda lifecycle management, with a focus on path-based deployment workflows that maintain function independence.

# Organizing Your Repository Structure

A well-organized repository structure is key to managing serverless functions effectively:

```
/
├── .github/
│   └── workflows/
│       ├── function-a-deploy.yml
│       ├── function-b-deploy.yml
│       └── function-c-deploy.yml
├── src/
│   ├── function-a/
│   │   ├── lambda_function.py
│   │   ├── requirements.txt
│   │   └── tests/
│   ├── function-b/
│   │   ├── lambda_function.py
│   │   ├── requirements.txt
│   │   └── tests/
│   ├── function-c/
│   │   ├── lambda_function.py
│   │   ├── requirements.txt
│   │   └── tests/
│   └── common/
│       └── utils.py
└── README.md
```

This structure provides:

- Clear separation between individual functions

- Dedicated workflows for each component

- Centralized location for shared code

- A logical organization that makes it easy to navigate and understand the codebase

# Path-Based Deployment Workflows

The key to effective Lambda lifecycle management is implementing independent deployment workflows for each function. This ensures changes to one function don't trigger unnecessary deployments of other components.

Here's an example workflow for function-a:

```
# .github/workflows/function-a-deploy.yml
name: Deploy Function A

on:
  push:
    branches:
      - main
    paths:
      - 'src/function-a/**'
      - '.github/workflows/function-a-deploy.yml'
  pull_request:
    paths:
      - 'src/function-a/**'

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: |
          cd src/function-a
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
          pip install pytest

      - name: Run tests
        run: |
          cd src/function-a
          python -m pytest tests/

      - name: Configure AWS credentials
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Package and deploy
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          cd src/function-a
          mkdir -p package
          pip install -r requirements.txt --target ./package
          cp lambda_function.py ./package/
          cd package
          zip -r ../function.zip .
          cd ..
          aws lambda update-function-code \\
            --function-name function-a \\
            --zip-file fileb://function.zip
```

# Benefits of the Path-Based Approach

This deployment strategy offers several key advantages:

- **Independent Deployment Cycles**: Each function follows its own release schedule, allowing teams to deploy changes frequently without affecting other components.

- **Reduced Risk**: Issues in one deployment don't impact other functions, containing potential problems to a smaller scope.

- **Accelerated Development**: Developers can work on different functions simultaneously without waiting for others to complete their work.

- **Clear Ownership**: Teams can take responsibility for specific functions, with GitHub's CODEOWNERS file helping to enforce code review requirements.

- **Streamlined Rollbacks**: If a deployment causes issues, only the affected function needs to be rolled back, not the entire application.

# Path Specification Best Practices

When setting up path-based workflows, consider these best practices:

- **Be Specific**: Include only the paths directly related to the function:

```
paths:
  - 'src/function-a/**'
  - '.github/workflows/function-a-deploy.yml'
```

- **Account for Shared Resources**: If functions depend on common utilities, trigger deployments when those resources change:

```
paths:
  - 'src/function-a/**'
  - 'src/common/**'  # Shared code
  - '.github/workflows/function-a-deploy.yml'
```

- **Include Workflow Self-Reference**: Add the workflow file itself to the path specification so that workflow changes trigger a new deployment.

- **Cover Test Files**: Ensure test files are included in the path specification, so that test changes also trigger the workflow.

# Deployment Process Breakdown

The deployment process consists of several key steps:

- **Checkout Code**: Pull the latest code from the repository.

- **Set Up Environment**: Install the required runtime (Python in our example).

- **Install Dependencies**: Install the function-specific dependencies defined in requirements.txt.

- **Run Tests**: Execute the function's test suite to ensure code quality.

- **Configure AWS Credentials**: Set up secure access to AWS services.

- **Package Function**: Create a deployment package with all dependencies and function code.

- **Deploy to AWS**: Update the Lambda function code in AWS.

This process ensures that each function is properly tested before deployment and includes all necessary dependencies.

# Handling Shared Code

When functions share common code, you need a strategy to ensure changes to shared code are properly propagated:

- **Option 1: Deploy All Affected Functions**: Update all workflows to trigger when shared code changes:

```
paths:
  - 'src/function-a/**'
  - 'src/common/**'
  - '.github/workflows/function-a-deploy.yml'
```

- **Option 2: Leverage Lambda Layers**: Create a separate Layer for shared code with its own deployment workflow.

- **Option 3: Bundle Shared Code**: Copy the shared code into each function's deployment package:

```
# In the package and deploy step
mkdir -p package
pip install -r requirements.txt --target ./package
cp lambda_function.py ./package/
cp -r ../common ./package/  # Copy shared code
cd package
zip -r ../function.zip .
```

# Conclusion

GitHub provides a solid foundation for managing AWS Lambda functions with path-based workflows, enabling independent deployments and reducing risk. By organizing your repository thoughtfully and automating key deployment steps, you can streamline the development process while maintaining code quality and stability. This approach balances function autonomy with shared best practices, making serverless application management more efficient and scalable.
---
2023-09-22
# Setting Up Playwright with Python
Playwright is a powerful open-source automation framework for web applications. It allows you to automate browser tasks and interactions with a user-friendly API. Whether you’re testing web applications or performing repetitive tasks, Playwright simplifies the process, making it easier to script and execute actions in multiple browsers.

Playwright for Python is a powerful automation tool that lets you control web browsers with Python code. It’s perfect for tasks like web scraping, testing, and automating repetitive web interactions.

### **Steps to Set up Playwright with Python**

Setting up Playwright is relatively simple, and here are the basic steps to get started

**Prerequisites**

**1. Python:  **Ensure that Python is installed on your system. Python 3.8 or higher is needed

   To check if Python is installed, open your terminal or command prompt and run

```
python --version
```

If not, install Python using the below command. This will install Python 3. x.

```
sudo apt update
sudo apt install python3
```

**2. Package Manager (pip): **In this article, I prefer to use the PIP Package Manager since it’s the most common one

Verify that you have the Python package manager, pip, installed. It is usually included with Python installations. You can check its version by running

```
pip --version
```

If not installed install it using

```
sudo apt update
sudo apt install python3-pip
```

**3. Virtual Environment: **Creating a virtual environment is a good practice to isolate your Python environment for different projects. You can create a virtual environment using the following commands. Replace the “PSU” with your ENV name.

```
python3 -m venv PSU
```

**Let’s get into the setup steps**

 **1. Update and Upgrade: ** Get the system updated using the below command

```
sudo apt update && sudo apt upgrade
```

   **2. Create a new folder:  **Create a new folder to keep it separate

**3. Install Playwright**: Switch to the new folder and install Playwright. You can install Playwright  using "pip"

```
pip install playwright
```

**4. Initialize Playwright:** After installation, you need to initialize Playwright to download the browser binaries. You can do this by running the following command

```
playwright install
```

**5. Testing framework**: Here I am using Pytest as a testing framework. You can indeed install `pytest-playwright` along with Playwright

```
pip install pytest-playwright
```

Once you have both Playwright and  `pytest-playwright`  installed, you can use the features provided by `pytest-playwright`  to write and run browser based tests using Playwright within Pytest test functions

**5. Get started!**

Yay, you are done with the setup. Activate the Virtual Environment to get started (Make sure you give the right path and name of the environment name)

Now you can generate the automation code using Playwright Codegen

```
playwright codegen https://example.com/
```

This will open up a Chromium browser with the given site address and a code writer window with options to switch between different test scripts. Here I have chosen Pytest 

Perform whatever actions you want to automate on the site and the code for that will be generated

**6. Run a sample test**

Create a test file

Paste the code in the file

Run it using pytest

That’s it, You are done!

Keep in mind that sometimes you  need to alter the code for more modifications

**Reference:** You can set up Playwright with other test [frameworks too](https://playwright.dev/python/docs/intro)
---
