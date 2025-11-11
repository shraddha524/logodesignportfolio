document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TYPING EFFECT IMPLEMENTATION ---
    const typedTextSpan = document.querySelector(".typed-text");
    if (typedTextSpan) {
        const typedItems = typedTextSpan.getAttribute("data-typed-items").split(",").map(item => item.trim());
        let itemIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentItem = typedItems[itemIndex];
            if (!isDeleting && charIndex < currentItem.length) {
                typedTextSpan.textContent += currentItem.charAt(charIndex);
                charIndex++;
                setTimeout(type, 80);
            } else if (isDeleting && charIndex > 0) {
                typedTextSpan.textContent = currentItem.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, 40);
            } else if (!isDeleting && charIndex === currentItem.length) {
                setTimeout(() => { isDeleting = true; type(); }, 1200);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                itemIndex = (itemIndex + 1) % typedItems.length;
                setTimeout(type, 400);
            }
        }
        type();
    }

    // --- 2. SCROLL ANIMATION IMPLEMENTATION ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes defined in CSS
    document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-scale-up').forEach(element => {
        observer.observe(element);
    });
    
    // --- 3. CHATBOT FUNCTIONALITY ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotBox = document.getElementById('chatbot-box');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    if (chatbotToggle && chatbotBox && chatbotClose && chatbotForm) {
        chatbotToggle.addEventListener('click', () => {
            chatbotBox.classList.toggle('active');
            
            if (chatbotBox.classList.contains('active') && chatbotMessages.children.length === 0) {
                setTimeout(() => {
                    // CORRECTED WELCOME MESSAGE: using <strong> tags
                    appendMessage('bot', "Hi! I'm Shraddha's Brand Assistant. Ask me about her design <strong>tools</strong>, <strong>skills</strong>, or <strong>portfolio projects</strong>!");
                }, 200);
            }
        });

        chatbotClose.addEventListener('click', () => {
            chatbotBox.classList.remove('active');
        });

        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatbotInput.value.trim();
            if (message) {
                appendMessage('user', message);
                chatbotInput.value = '';
                
                // Simple auto-reply logic based on resume content
                const lowerMsg = message.toLowerCase();
                let botResponse = "I can only answer questions related to Shraddha's design work. Try asking about her tools or core skills!";

                // CORRECTED REPLIES: using <strong> tags
                if (lowerMsg.includes('tool') || lowerMsg.includes('software')) {
                    botResponse = "Shraddha is highly proficient in <strong>Adobe Illustrator, Adobe Photoshop, Figma</strong>, and <strong>Canva</strong> for all her design work.";
                } else if (lowerMsg.includes('skill') || lowerMsg.includes('specialize') || lowerMsg.includes('branding')) {
                    botResponse = "Her core specializations are <strong>Logo Design, Brand Identity Systems, Typography</strong>, and <strong>Stationery Design</strong>.";
                } else if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
                    botResponse = "She has created a brand identity for <strong>Brewora Coffee</strong>, a premium business card for <strong>SnapSphere Photography</strong>, and a modern logo for <strong>SparkFlow</strong>.";
                } else if (lowerMsg.includes('contact') || lowerMsg.includes('email')) {
                    botResponse = "You can contact Shraddha directly at <strong>thinkneuofficial@gmail.com</strong> or call her at <strong>+91-9945185153</strong>.";
                }

                setTimeout(() => {
                    appendMessage('bot', botResponse);
                }, 1000);
            }
        });

        function appendMessage(sender, text) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            // Use innerHTML to process <strong> tags from the bot's response
            messageElement.innerHTML = `<p>${text}</p>`; 
            chatbotMessages.appendChild(messageElement);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
        }
    }
});