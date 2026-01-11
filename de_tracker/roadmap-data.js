// =============================================
// DATA ENGINEERING ROADMAP - 2026 Edition
// Curated free resources for 5+ years experience
// =============================================

const roadmapData = [
    // =============================================
    // 1. PYTHON PROGRAMMING
    // =============================================
    {
        id: 'python',
        title: 'Python Mastery',
        subtitle: 'Advanced scripting & libraries',
        icon: '🐍',
        iconClass: 'python',
        courses: [
            {
                id: 'py-1',
                title: 'Data Engineering Zoomcamp',
                provider: 'DataTalks.Club',
                type: 'Course',
                url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp',
                duration: '10+ weeks'
            },
            {
                id: 'py-2',
                title: 'Python OOP Tutorial',
                provider: 'Corey Schafer',
                type: 'Playlist',
                url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc',
                duration: '2 hours'
            },
            {
                id: 'py-3',
                title: 'Async Python Tutorial',
                provider: 'Tech With Tim',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=t5Bo1Je9EmE',
                duration: '1.5 hours'
            },
            {
                id: 'py-4',
                title: 'Pandas for Production',
                provider: 'Data School',
                type: 'Playlist',
                url: 'https://www.youtube.com/playlist?list=PL5-da3qGB5ICCsgW1MxlZ0Hq8LL5U3u9y',
                duration: '5+ hours'
            },
            {
                id: 'py-5',
                title: 'Data Engineer Handbook',
                provider: 'DataExpert.io',
                type: 'GitHub',
                url: 'https://github.com/DataExpert-io/data-engineer-handbook',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 2. SQL MASTERY
    // =============================================
    {
        id: 'sql',
        title: 'SQL Mastery',
        subtitle: 'Window functions, CTEs, optimization',
        icon: '🗃️',
        iconClass: 'sql',
        courses: [
            {
                id: 'sql-1',
                title: 'SQL for Data Analysis (Udacity)',
                provider: 'Udacity',
                type: 'Course',
                url: 'https://www.udacity.com/course/sql-for-data-analysis--ud198',
                duration: '4 weeks'
            },
            {
                id: 'sql-2',
                title: 'Advanced SQL Tutorial',
                provider: 'Mode Analytics',
                type: 'Tutorial',
                url: 'https://mode.com/sql-tutorial/intro-to-advanced-sql/',
                duration: 'Self-paced'
            },
            {
                id: 'sql-3',
                title: 'SQL Window Functions Explained',
                provider: 'Maven Analytics',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=Ww71knvhQ-s',
                duration: '30 min'
            },
            {
                id: 'sql-4',
                title: 'SQLZoo Interactive Exercises',
                provider: 'SQLZoo',
                type: 'Practice',
                url: 'https://sqlzoo.net/',
                duration: 'Self-paced'
            },
            {
                id: 'sql-5',
                title: 'SQL Masterclass',
                provider: 'Data with Danny',
                type: 'GitHub',
                url: 'https://github.com/DataWithDanny/sql-masterclass',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 3. DATA MODELING
    // =============================================
    {
        id: 'modeling',
        title: 'Data Modeling',
        subtitle: 'Star schema, data vault, normalization',
        icon: '📐',
        iconClass: 'modeling',
        courses: [
            {
                id: 'dm-1',
                title: 'Kimball Dimensional Data Modeling',
                provider: 'Holistics',
                type: 'Guide',
                url: 'https://www.holistics.io/books/setup-analytics/kimball-s-dimensional-data-modeling/',
                duration: 'Self-paced'
            },
            {
                id: 'dm-2',
                title: 'AutomateDV Getting Started',
                provider: 'AutomateDV',
                type: 'Docs',
                url: 'https://automate-dv.readthedocs.io/en/latest/worked_example/',
                duration: 'Self-paced'
            },
            {
                id: 'dm-3',
                title: 'dbt Learn (Free Course)',
                provider: 'dbt Labs',
                type: 'Course',
                url: 'https://courses.getdbt.com/collections',
                duration: '10+ hours'
            },
            {
                id: 'dm-4',
                title: 'Database Normalization (1NF to BCNF)',
                provider: 'Code Lucky',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=J-drts33N8g',
                duration: '30 min'
            },
            {
                id: 'dm-5',
                title: 'dbt Dimensional Modelling Guide',
                provider: 'Data Engineer Camp',
                type: 'GitHub',
                url: 'https://github.com/Data-Engineer-Camp/dbt-dimensional-modelling',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 4. CLOUD PLATFORMS
    // =============================================
    {
        id: 'cloud',
        title: 'Cloud Platforms',
        subtitle: 'AWS, GCP, Azure data services',
        icon: '☁️',
        iconClass: 'cloud',
        courses: [
            {
                id: 'cloud-1',
                title: 'AWS Data Engineering Learning Path',
                provider: 'AWS Skill Builder',
                type: 'Course',
                url: 'https://explore.skillbuilder.aws/learn/public/learning_plan/view/2019/data-engineer-learning-plan',
                duration: '30+ hours'
            },
            {
                id: 'cloud-2',
                title: 'Google Cloud Skills Boost (Free Labs)',
                provider: 'Google Cloud',
                type: 'Hands-on',
                url: 'https://www.cloudskillsboost.google/',
                duration: 'Self-paced'
            },
            {
                id: 'cloud-3',
                title: 'Azure Data Engineering Path',
                provider: 'Microsoft Learn',
                type: 'Course',
                url: 'https://learn.microsoft.com/en-us/training/paths/get-started-data-engineering/',
                duration: '8+ hours'
            },
            {
                id: 'cloud-4',
                title: 'BigQuery for Data Analysts',
                provider: 'Google Cloud',
                type: 'Course',
                url: 'https://www.cloudskillsboost.google/course_templates/415',
                duration: '6 hours'
            },
            {
                id: 'cloud-5',
                title: 'Awesome Data Engineering',
                provider: 'Community',
                type: 'GitHub',
                url: 'https://github.com/igorbarinov/awesome-data-engineering',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 5. BIG DATA (SPARK)
    // =============================================
    {
        id: 'spark',
        title: 'Big Data (Spark)',
        subtitle: 'PySpark, DataFrames, optimization',
        icon: '⚡',
        iconClass: 'spark',
        courses: [
            {
                id: 'spark-1',
                title: 'Introduction to PySpark',
                provider: 'DataCamp (Free Chapter)',
                type: 'Course',
                url: 'https://www.datacamp.com/courses/introduction-to-pyspark',
                duration: '4 hours'
            },
            {
                id: 'spark-2',
                title: 'PySpark Tutorial (Zero to Pro)',
                provider: 'Ansh Lamba',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=EB8lfdxpirM',
                duration: '6 hours'
            },
            {
                id: 'spark-3',
                title: 'Databricks Academy (Free Courses)',
                provider: 'Databricks',
                type: 'Course',
                url: 'https://www.databricks.com/learn/training/lakehouse-fundamentals',
                duration: '2 hours'
            },
            {
                id: 'spark-4',
                title: 'Spark Memory Management',
                provider: 'Bartosz Mikulski',
                type: 'Blog',
                url: 'https://www.mikulskibartosz.name/understanding-spark-memory-allocation/',
                duration: 'Self-paced'
            },
            {
                id: 'spark-5',
                title: 'Learning Apache Spark',
                provider: 'Runawayhorse001',
                type: 'GitHub',
                url: 'https://github.com/runawayhorse001/LearningApacheSpark',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 6. ORCHESTRATION
    // =============================================
    {
        id: 'orchestration',
        title: 'Orchestration',
        subtitle: 'Airflow, Dagster, Prefect',
        icon: '🔄',
        iconClass: 'orchestration',
        courses: [
            {
                id: 'orch-1',
                title: 'Complete Airflow Tutorial',
                provider: 'Data with Marc',
                type: 'Playlist',
                url: 'https://www.youtube.com/playlist?list=PLwFJcsJ61oujAqYT2y-n6OIlTryU-P4K6',
                duration: '5+ hours'
            },
            {
                id: 'orch-2',
                title: 'Astronomer Academy (Free Airflow Courses)',
                provider: 'Astronomer',
                type: 'Course',
                url: 'https://academy.astronomer.io/',
                duration: '5+ hours'
            },
            {
                id: 'orch-3',
                title: 'Dagster University',
                provider: 'Dagster',
                type: 'Course',
                url: 'https://courses.dagster.io/courses/dagster-essentials',
                duration: '4 hours'
            },
            {
                id: 'orch-4',
                title: 'Prefect Tutorial Series',
                provider: 'Prefect',
                type: 'Docs',
                url: 'https://docs.prefect.io/latest/tutorials/',
                duration: 'Self-paced'
            },
            {
                id: 'orch-5',
                title: 'Awesome Apache Airflow',
                provider: 'Community',
                type: 'GitHub',
                url: 'https://github.com/jghoman/awesome-apache-airflow',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 7. STREAMING (KAFKA)
    // =============================================
    {
        id: 'streaming',
        title: 'Streaming (Kafka)',
        subtitle: 'Real-time pipelines, Flink',
        icon: '🌊',
        iconClass: 'streaming',
        courses: [
            {
                id: 'stream-1',
                title: 'Apache Kafka Crash Course',
                provider: 'Confluent',
                type: 'Course',
                url: 'https://developer.confluent.io/courses/apache-kafka/events/',
                duration: '1.5 hours'
            },
            {
                id: 'stream-2',
                title: 'Apache Kafka with Python',
                provider: 'Confluent',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=qi7uR3ItaOY',
                duration: '40 min'
            },
            {
                id: 'stream-3',
                title: 'Simplifying Data Pipelines with Kafka',
                provider: 'IBM (Class Central)',
                type: 'Course',
                url: 'https://www.classcentral.com/course/simplifying-data-pipelines-with-apache-kafka-89936',
                duration: '4 hours'
            },
            {
                id: 'stream-4',
                title: 'Introduction to Apache Flink',
                provider: 'Ververica',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=RCP9-HdId9w',
                duration: '1 hour'
            },
            {
                id: 'stream-5',
                title: 'Kafka Flink Streaming Demo',
                provider: 'Joseph Machado',
                type: 'GitHub',
                url: 'https://github.com/josephmachado/beginner_de_project_stream',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 8. DATA QUALITY & GOVERNANCE
    // =============================================
    {
        id: 'quality',
        title: 'Data Quality & Governance',
        subtitle: 'Great Expectations, lineage, catalogs',
        icon: '✅',
        iconClass: 'quality',
        courses: [
            {
                id: 'qual-1',
                title: 'Great Expectations Tutorial',
                provider: 'Great Expectations',
                type: 'Docs',
                url: 'https://docs.greatexpectations.io/docs/tutorials/quickstart/',
                duration: 'Self-paced'
            },
            {
                id: 'qual-2',
                title: 'What is Data Governance?',
                provider: 'IBM',
                type: 'Guide',
                url: 'https://www.ibm.com/topics/data-governance',
                duration: 'Self-paced'
            },
            {
                id: 'qual-3',
                title: 'Data Lineage with OpenLineage',
                provider: 'OpenLineage',
                type: 'Docs',
                url: 'https://openlineage.io/getting-started/',
                duration: 'Self-paced'
            },
            {
                id: 'qual-4',
                title: 'Monte Carlo Data Observability Guide',
                provider: 'Monte Carlo',
                type: 'Blog',
                url: 'https://www.montecarlodata.com/blog-what-is-data-observability/',
                duration: 'Self-paced'
            },
            {
                id: 'qual-5',
                title: 'Awesome Data Quality',
                provider: 'Community',
                type: 'GitHub',
                url: 'https://github.com/kwanUm/awesome-data-quality',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 9. DEVOPS & MLOps
    // =============================================
    {
        id: 'devops',
        title: 'DevOps & MLOps',
        subtitle: 'Docker, Git, CI/CD, containers',
        icon: '🐳',
        iconClass: 'devops',
        courses: [
            {
                id: 'dev-1',
                title: 'Docker Tutorial for Beginners',
                provider: 'TechWorld with Nana',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=pg19Z8LL06w',
                duration: '1 hour'
            },
            {
                id: 'dev-2',
                title: 'Git and GitHub Tutorial',
                provider: 'Amigoscode',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=3fUbBnN_H2c',
                duration: '1 hour'
            },
            {
                id: 'dev-3',
                title: 'GitHub Actions CI/CD Tutorial',
                provider: 'GitHub',
                type: 'Docs',
                url: 'https://docs.github.com/en/actions/learn-github-actions',
                duration: 'Self-paced'
            },
            {
                id: 'dev-4',
                title: 'MLOps Zoomcamp (Free Bootcamp)',
                provider: 'DataTalks.Club',
                type: 'Course',
                url: 'https://github.com/DataTalksClub/mlops-zoomcamp',
                duration: '10+ weeks'
            },
            {
                id: 'dev-5',
                title: 'Docker Curriculum',
                provider: 'Prakhar Srivastav',
                type: 'GitHub',
                url: 'https://github.com/prakhar1989/docker-curriculum',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 10. SYSTEM DESIGN
    // =============================================
    {
        id: 'system',
        title: 'System Design',
        subtitle: 'Architectures, partitioning, scaling',
        icon: '🏗️',
        iconClass: 'system',
        courses: [
            {
                id: 'sys-1',
                title: 'System Design for Data Engineers',
                provider: 'Jordan Has No Life',
                type: 'Playlist',
                url: 'https://www.youtube.com/playlist?list=PLjTveVh7FakLdTmm42TMxbN8PvVn5g4KJ',
                duration: '20+ hours'
            },
            {
                id: 'sys-2',
                title: 'Lambda Architecture Explained',
                provider: 'Towards Data Science',
                type: 'Blog',
                url: 'https://towardsdatascience.com/a-beginners-guide-to-the-lambda-architecture-5a96c0467cc4',
                duration: 'Self-paced'
            },
            {
                id: 'sys-3',
                title: 'Designing Data-Intensive Apps (Book)',
                provider: 'Martin Kleppmann',
                type: 'Book (Free Preview)',
                url: 'https://dataintensive.net/',
                duration: 'Self-paced'
            },
            {
                id: 'sys-4',
                title: 'Data Partitioning Strategies',
                provider: 'Confluent Blog',
                type: 'Blog',
                url: 'https://www.confluent.io/blog/how-choose-number-topics-partitions-kafka-cluster/',
                duration: 'Self-paced'
            },
            {
                id: 'sys-5',
                title: 'System Design Primer',
                provider: 'Donne Martin',
                type: 'GitHub',
                url: 'https://github.com/donnemartin/system-design-primer',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 11. AI FOR DATA ENGINEERING
    // =============================================
    {
        id: 'ai',
        title: 'AI for Data Engineering',
        subtitle: 'LLMs, prompt engineering, copilots',
        icon: '🤖',
        iconClass: 'ai',
        courses: [
            {
                id: 'ai-1',
                title: 'Prompt Engineering Guide',
                provider: 'OpenAI',
                type: 'Docs',
                url: 'https://platform.openai.com/docs/guides/prompt-engineering',
                duration: 'Self-paced'
            },
            {
                id: 'ai-2',
                title: 'LangChain for LLM Apps',
                provider: 'DeepLearning.AI',
                type: 'Course',
                url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/',
                duration: '1 hour'
            },
            {
                id: 'ai-3',
                title: 'Building RAG Applications',
                provider: 'LlamaIndex',
                type: 'Docs',
                url: 'https://docs.llamaindex.ai/en/stable/',
                duration: 'Self-paced'
            },
            {
                id: 'ai-4',
                title: 'Vector Databases Explained',
                provider: 'Pinecone',
                type: 'Blog',
                url: 'https://www.pinecone.io/learn/vector-database/',
                duration: 'Self-paced'
            },
            {
                id: 'ai-5',
                title: 'Awesome LLM',
                provider: 'Community',
                type: 'GitHub',
                url: 'https://github.com/Hannibal046/Awesome-LLM',
                duration: 'Self-paced'
            }
        ]
    },

    // =============================================
    // 12. SOFT SKILLS & LEADERSHIP
    // =============================================
    {
        id: 'soft',
        title: 'Soft Skills & Leadership',
        subtitle: 'Communication, mentorship, business acumen',
        icon: '🎯',
        iconClass: 'soft',
        courses: [
            {
                id: 'soft-1',
                title: 'How to Become a Tech Lead',
                provider: 'Fireship',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=0SARbwvhupQ',
                duration: '10 min'
            },
            {
                id: 'soft-2',
                title: 'Google Technical Writing Course',
                provider: 'Google',
                type: 'Course',
                url: 'https://developers.google.com/tech-writing',
                duration: '2 hours'
            },
            {
                id: 'soft-3',
                title: 'Staff Engineer Path (Book Summary)',
                provider: 'Will Larson',
                type: 'Blog',
                url: 'https://staffeng.com/guides/',
                duration: 'Self-paced'
            },
            {
                id: 'soft-4',
                title: 'Mentorship Matters',
                provider: 'TEDx Talks',
                type: 'Video',
                url: 'https://www.youtube.com/watch?v=18uDutylDa4',
                duration: '15 min'
            },
            {
                id: 'soft-5',
                title: 'Awesome Staff+ Engineering',
                provider: 'Community',
                type: 'GitHub',
                url: 'https://github.com/staffeng42/awesome-staff-plus-engineering',
                duration: 'Self-paced'
            }
        ]
    }
];
