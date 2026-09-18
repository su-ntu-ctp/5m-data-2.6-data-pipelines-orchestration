// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeCollapsibles();
    addScrollAnimations();
});

// Tab Switching
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Collapsible Sections
function initializeCollapsibles() {
    const collapsibleButtons = document.querySelectorAll('.collapsible-btn');
    
    collapsibleButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            
            // Add smooth transition effect
            if (content.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// Add scroll animations for cards
function addScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Add code copy functionality for code blocks
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((block) => {
        const pre = block.parentElement;
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-code-btn';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 6px 12px;
            background: var(--accent-primary);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyButton);
        
        wrapper.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        wrapper.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', async () => {
            const code = block.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                copyButton.textContent = 'Copied!';
                copyButton.style.background = 'var(--accent-success)';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.style.background = 'var(--accent-primary)';
                }, 2000);
            } catch (err) {
                copyButton.textContent = 'Failed';
                copyButton.style.background = 'var(--accent-warning)';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.style.background = 'var(--accent-primary)';
                }, 2000);
            }
        });
    });
});

// Add subtle parallax effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.pageYOffset;
    
    if (header && scrollPosition < 300) {
        header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        header.style.opacity = `${1 - (scrollPosition / 500)}`;
    }
});

// Add interactive hints
document.addEventListener('DOMContentLoaded', function() {
    const hintBoxes = document.querySelectorAll('.hint-box');
    
    hintBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Interactive tag highlighting
document.addEventListener('DOMContentLoaded', function() {
    const tags = document.querySelectorAll('.tag, .source-tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.5s';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .copy-code-btn:hover {
        background: var(--accent-secondary) !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Add keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const activeTab = document.querySelector('.tab-btn.active');
    const currentIndex = tabButtons.indexOf(activeTab);
    
    if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
        tabButtons[currentIndex + 1].click();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        tabButtons[currentIndex - 1].click();
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('button, a, .collapsible-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Progress indicator for long pages
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Add expand all / collapse all functionality for collapsibles
document.addEventListener('DOMContentLoaded', function() {
    // This function can be called to expand or collapse all sections in a card
    window.toggleAllCollapsibles = function(expand = true) {
        const collapsibleButtons = document.querySelectorAll('.collapsible-btn');
        const collapsibleContents = document.querySelectorAll('.collapsible-content');
        
        collapsibleButtons.forEach((button, index) => {
            const content = collapsibleContents[index];
            
            if (expand) {
                button.classList.add('active');
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                button.classList.remove('active');
                content.classList.remove('active');
                content.style.maxHeight = '0';
            }
        });
    };
});

// Modal Content Data
const modalContent = {
    'tap-extractors': {
        title: '📥 Extractors (Taps)',
        content: `
            <p>A <em>tap</em> is a Meltano plugin that reads data from a source — an API, a database, a file — and outputs it in the standardised Singer format. This lesson uses two: <code>tap-github</code> and <code>tap-postgres</code>.</p>

            <h3>tap-github</h3>
            <p>Pulls the <em>releases</em> entity from the GitHub API for the <code>pandas-dev/pandas</code> repository, selecting only <code>tag_name</code>, <code>body</code>, and <code>published_at</code>.</p>
            <pre><code class="language-bash">meltano add tap-github
meltano config set tap-github --interactive</code></pre>

            <h3>tap-postgres</h3>
            <p>Connects to the HDB resale flat prices table hosted on Supabase (Postgres), filtered to the <code>public</code> schema.</p>
            <pre><code class="language-bash">meltano add tap-postgres
meltano select tap-postgres "public-resale_flat_prices_from_jan_2017" "*"</code></pre>

            <div class="highlight-box">
                <p>💡 Always select specific entities/attributes rather than extracting everything — it's faster, cheaper, and cleaner.</p>
            </div>

            <h3>📖 Documentation</h3>
            <ul>
                <li><a href="https://hub.meltano.com/extractors/tap-github/" target="_blank">tap-github on Meltano Hub</a></li>
                <li><a href="https://hub.meltano.com/extractors/tap-postgres/" target="_blank">tap-postgres on Meltano Hub</a></li>
            </ul>
        `
    },
    'target-loaders': {
        title: '📤 Loaders (Targets)',
        content: `
            <p>A <em>target</em> is the counterpart to a tap — it receives the standardised data stream and writes it to a destination, handling table creation, schema inference, and batching.</p>

            <h3>target-jsonl (local test)</h3>
            <p>Dumps each record as a line of JSON to the local <code>output/</code> folder — the fastest way to sanity-check a tap before touching the cloud.</p>
            <pre><code class="language-bash">meltano add target-jsonl
meltano run tap-github target-jsonl</code></pre>

            <h3>target-bigquery (production)</h3>
            <p>Writes directly into a BigQuery dataset.</p>
            <pre><code class="language-bash">meltano add target-bigquery
meltano run tap-github target-bigquery</code></pre>

            <div class="highlight-box">
                <p>💡 Known issue: setuptools &ge; 81.0.0 removed <code>pkg_resources</code>. Fix by adding <code>setuptools&lt;80</code> to the <code>target-bigquery</code> <code>pip_url</code> in <code>meltano.yml</code>.</p>
            </div>

            <h3>📖 Documentation</h3>
            <ul>
                <li><a href="https://hub.meltano.com/loaders/target-bigquery/" target="_blank">target-bigquery on Meltano Hub</a></li>
                <li><a href="https://hub.meltano.com/loaders/target-jsonl/" target="_blank">target-jsonl on Meltano Hub</a></li>
            </ul>
        `
    },
    'dbt-sources-models': {
        title: '📋 Sources & Models',
        content: `
            <p>A dbt <strong>source</strong> tells dbt where raw data lives so it can be referenced in SQL with <code>{{ source(...) }}</code>. A dbt <strong>model</strong> is a saved SQL <code>SELECT</code> statement that dbt compiles and runs as a table or view.</p>

            <h3>source.yml</h3>
            <pre><code class="language-yaml">sources:
  - name: resale
    schema: resale
    tables:
      - name: public_resale_flat_prices_from_jan_2017</code></pre>

            <h3>prices.sql</h3>
            <p>Casts string columns to numeric and adds a <code>price_per_sqm</code> calculated column.</p>

            <h3>prices_by_town_type_model.sql</h3>
            <p>Depends on <code>prices</code> via <code>{{ ref('prices') }}</code> and aggregates average prices by town, flat type, and flat model.</p>

            <div class="highlight-box">
                <p>💡 Models form a DAG — dbt reads the <code>ref()</code> calls to figure out the correct run order automatically.</p>
            </div>

            <h3>📖 Documentation</h3>
            <ul>
                <li><a href="https://docs.getdbt.com/docs/build/sources" target="_blank">dbt Sources</a></li>
                <li><a href="https://docs.getdbt.com/docs/build/models" target="_blank">dbt Models</a></li>
            </ul>
        `
    },
    'dbt-materialization': {
        title: '⚙️ Materialization',
        content: `
            <p>Materialization controls how dbt turns a model's SQL into something physical in the warehouse.</p>

            <h3>table</h3>
            <p>dbt runs a <code>CREATE TABLE</code> statement — the result is fully rebuilt (and stored) on every <code>dbt run</code>. Used for both models in this lesson.</p>
            <pre><code class="language-sql">{{ config(materialized='table') }}</code></pre>

            <h3>view</h3>
            <p>dbt creates a <code>CREATE VIEW</code> — the query re-runs every time the view is read. No storage cost, but no speed benefit either.</p>

            <h3>Project default</h3>
            <pre><code class="language-yaml">models:
  resale_flat:
    +materialized: table</code></pre>

            <div class="highlight-box">
                <p>💡 Remove the generated <code>example</code> block from <code>dbt_project.yml</code> before running — it just points at a folder that no longer matters for this project.</p>
            </div>

            <h3>📖 Documentation</h3>
            <ul>
                <li><a href="https://docs.getdbt.com/docs/build/materializations" target="_blank">dbt Materializations</a></li>
            </ul>
        `
    },
    'dagster-assets': {
        title: '🧩 Software-Defined Assets',
        content: `
            <p>An asset is a logical unit of data that can be produced or consumed by a pipeline — a table, a file, a DataFrame, a machine learning model.</p>

            <h3>The two assets in this lesson</h3>
            <ul>
                <li><strong>pandas_releases</strong> — calls the GitHub API and returns a DataFrame of pandas releases</li>
                <li><strong>summary_statistics</strong> — depends on <code>pandas_releases</code>, counts mentions of "feature", "bug", "performance"</li>
            </ul>

            <div class="highlight-box">
                <p>💡 Dagster infers the dependency because <code>summary_statistics</code> declares <code>pandas_releases: pd.DataFrame</code> as a function parameter — no manual wiring needed.</p>
            </div>

            <h3>Defining an asset</h3>
            <pre><code class="language-python">@asset
def pandas_releases(context: AssetExecutionContext) -> pd.DataFrame:
    ...
    return df</code></pre>

            <h3>📖 Documentation</h3>
            <ul>
                <li><a href="https://docs.dagster.io/concepts/assets/software-defined-assets" target="_blank">Software-Defined Assets</a></li>
            </ul>
        `
    },
    'dagster-jobs-schedules': {
        title: '⏰ Jobs & Schedules',
        content: `
            <p>A <strong>job</strong> targets a selection of assets to materialize them together as one action. A <strong>schedule</strong> starts a run of a job at a specified time.</p>

            <pre><code class="language-python">pandas_job = define_asset_job(name="pandas_job", selection=AssetSelection.all())

pandas_schedule = ScheduleDefinition(
    name="pandas_schedule",
    job=pandas_job,
    cron_schedule="0 0 * * *"  # every day at midnight
)</code></pre>

            <div class="highlight-box">
                <p>💡 <code>cron_schedule="0 0 * * *"</code> reads as "at 00:00 every day." Use <a href="https://crontab.guru" target="_blank">crontab.guru</a> to decode any cron expression.</p>
            </div>

            <h3>The Definitions object</h3>
            <p>Combines assets, jobs, and schedules into one entity Dagster loads on startup:</p>
            <pre><code class="language-python">defs = Definitions(
    assets=all_assets,
    jobs=[pandas_job],
    schedules=[pandas_schedule],
)</code></pre>

            <h3>📖 Documentation</h3>
            <ul>
                <li><a href="https://docs.dagster.io/concepts/partitions-schedules-sensors/schedules" target="_blank">Dagster Schedules</a></li>
            </ul>
        `
    }
};

// Modal Functions
function initializeModal() {
    const modal = document.getElementById('modal-overlay');
    const modalContentEl = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.modal-close');
    const featureButtons = document.querySelectorAll('.feature-btn');
    
    // Open modal when feature button is clicked
    featureButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const content = modalContent[modalId];
            
            if (content) {
                modalContentEl.innerHTML = `
                    <h2>${content.title}</h2>
                    ${content.content}
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the modal container
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize modal on page load
document.addEventListener('DOMContentLoaded', initializeModal);

// Console message for developers
console.log('%c🔄 Data Pipelines & Orchestration Guide', 'font-size: 20px; font-weight: bold; color: #1B2A4A;');
console.log('%cExplore Meltano, dbt & Dagster!', 'font-size: 14px; color: #5F6B7A;');
console.log('%cTip: Use arrow keys to navigate between tabs!', 'font-size: 12px; color: #2F7D5B;');
console.log('%cClick on the feature buttons to learn more!', 'font-size: 12px; color: #2C5697;');
