const fs = require('fs');
const path = require('path');

const roadmapPath = path.join(__dirname, 'roadmap-data.js');
const content = fs.readFileSync(roadmapPath, 'utf8');

const urlRegex = /url:\s*['"]([^'"]+)['"]/g;
const links = [];
let match;

while ((match = urlRegex.exec(content)) !== null) {
    links.push(match[1]);
}

console.log(`Found ${links.length} links to check...`);

async function checkLink(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            // 403/429 often means bot protection, not broken link. Treat as warning/manual check needed.
            if (response.status === 403 || response.status === 999 || response.status === 429) {
                return { url, status: response.status, valid: true, warning: `HTTP ${response.status} (Likely Bot Protection)` };
            }
            return { url, status: response.status, valid: false, error: `HTTP ${response.status}` };
        }

        const text = await response.text();
        const lowerText = text.toLowerCase();

        // YouTube specific checks
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            if (lowerText.includes('"playabilityStatus":{"status":"ERROR"') ||
                lowerText.includes('video unavailable') ||
                text.includes('This video is unavailable')) {
                return { url, status: 200, valid: false, error: 'YouTube Video Unavailable' };
            }
        }

        return { url, status: response.status, valid: true };

    } catch (err) {
        return { url, status: 0, valid: false, error: err.message };
    }
}

async function run() {
    console.log('Starting validation...');
    const results = [];
    const chunkSize = 5;

    for (let i = 0; i < links.length; i += chunkSize) {
        const chunk = links.slice(i, i + chunkSize);
        const chunkResults = await Promise.all(chunk.map(checkLink));
        results.push(...chunkResults);
        process.stdout.write(`Processed ${Math.min(i + chunkSize, links.length)}/${links.length}\r`);
    }
    console.log('\n');

    const broken = results.filter(r => !r.valid);
    const warnings = results.filter(r => r.valid && r.warning);

    console.log('--- REPORT ---');
    console.log(`Total checked: ${results.length}`);
    console.log(`Valid: ${results.length - broken.length}`);
    console.log(`Broken: ${broken.length}`);

    if (broken.length > 0) {
        console.log('\n❌ BROKEN LINKS:');
        broken.forEach(b => console.log(`- ${b.url} [${b.error}]`));
    } else {
        console.log('\n✅ No broken links found!');
    }

    if (warnings.length > 0) {
        console.log('\n⚠️ WARNINGS (Manual Verification Recommended):');
        warnings.forEach(w => console.log(`- ${w.url} [${w.warning}]`));
    }
}

run();
