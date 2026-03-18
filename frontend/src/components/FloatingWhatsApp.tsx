import WhatsAppIcon from "./WhatsAppIcon";

const FloatingWhatsApp = () => {
    const whatsappLink = "https://wa.me/918547448971?text=Hi%20Mr%20Blends%2C%20I%20need%20help%20with%20an%20order";

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <WhatsAppIcon className="h-7 w-7" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-body font-semibold whitespace-nowrap">
                Chat with us
            </span>
        </a>
    );
};

export default FloatingWhatsApp;
