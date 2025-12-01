module.exports = {
    username: "Your Username Here",
    discord_id: "YOUR_DISCORD_ID_HERE",
    title: "Your Title Here",
    bio: "Your bio here.",

    theme: "blue",
    themes: {
        blue: {
            name: "Blue",
            primary: "#00aaff",
            secondary: "#8a2be2",
            tertiary: "#00d4ff"
        }
    },

    tagline: "Your tagline here.",
    about: "Your about text here.",

    socials: [
        { name: "GitHub", link: "https://github.com/your-username" },
        { name: "Discord", link: "https://discord.com/your-server" },
        { name: "Youtube", link: "https://youtube.com/your-channel" }
    ],

    skills: [
        { name: "JavaScript", emoji: "⚡" },
        { name: "Node.js", emoji: "🟢" },
        { name: "HTML & CSS", emoji: "🎨" },
        { name: "React", emoji: "⚛️" },
        { name: "UI/UX Design", emoji: "✨" },
        { name: "Database Design", emoji: "🗄️" }
    ],

    music: {
        enabled: true,
        service: "spotify",
        spotify: {
            clientId: "YOUR_SPOTIFY_CLIENT_ID",
            clientSecret: "YOUR_SPOTIFY_CLIENT_SECRET",
            refreshToken: "YOUR_SPOTIFY_REFRESH_TOKEN"
        },
        showCount: 6,
        refreshInterval: 3600000
    },

    projects: [
        {
            name: "Project Name",
            desc: "Short description of your projects.",
            tags: ["Tech1", "Tech2", "Tech3"],
            year: 2024,
            link: "https://example.com/project1",
            details: "Detailed description of the project and what makes it special."
        }
    ],

    testimonials: [
        { name: "Client Name", quote: "Quote about working with you." }
    ],

    technologies: {
        frontend: [
            "React",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Tailwind",
            "Vue.js"
        ],
        backend: [
            "Node.js",
            "Express",
            "MongoDB",
            "REST APIs",
            "PostgreSQL",
            "Python"
        ],
        tools: [
            "Git",
            "Docker",
            "AWS",
            "Figma",
            "VS Code",
            "Linux"
        ]
    },

    services: [
        {
            icon: "🔧",
            title: "Service 1",
            description: "Description of service 1."
        },
        {
            icon: "🚀",
            title: "Service 2",
            description: "Description of service 2."
        }
    ],

    contacts: [
        { icon: "📧", label: "Email", value: "your-email@example.com", link: "mailto:your-email@example.com" },
        { icon: "💬", label: "Discord", value: "YourUsername", link: "https://discord.com/users/YOUR_ID" },
        { icon: "📍", label: "Location", value: "Your City", link: "#" },
        { icon: "📱", label: "Phone", value: "+1 (555) 123-4567", link: "tel:+15551234567" },
    ],

    socalMedia: [
        { name: "GitHub", link: "https://github.com/your-username" },
        { name: "Discord", link: "https://discord.com/your-server" },
        { name: "Youtube", link: "https://youtube.com/your-channel" },
        { name: "Twitter", link: "https://twitter.com/your-handle" }
    ],

    skillsIcon: "⚡"
}
