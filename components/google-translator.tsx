"use client";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from 'cookies-next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import Image from "next/image"; // Import Image component for flag icons
import { Skeleton } from "../components/ui/skeleton";

// Declare google and googleTranslateElementInit on the window object

interface GoogleTranslate {
    translate: {
        TranslateElement: new (options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: {
                InlineLayout: {
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    SIMPLE: any
                };
            }
            autoDisplay: boolean;
        }, elementId: string) => void;

    };
}


declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        google: GoogleTranslate | any; // Use the defined interface here
    }
}

const GoogleTranslate = () => {
    const [selected, setSelected] = useState('/auto/en');
    const [isLoading, setLoading] = useState(true)
    // Array with language labels, values, and flag image URLs
    const languages = [
        { label: 'English', value: '/auto/en', flag: '/assets/flag/en.png' },
        { label: 'Nepali', value: '/auto/ne', flag: '/assets/flag/np.png' },
    ];

    // Function to initialize Google Translate
    const googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ne',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
            }, 'google_translate_element');

            // Remove Google branding and logo after Google Translate initializes
            const interval = setInterval(() => {
                const googleLogo = document.querySelector('.goog-logo') as HTMLElement;
                const googleBranding = document.querySelector('.goog-te-gadget') as HTMLElement;
                const googleHeader = document.querySelector('.skiptranslate') as HTMLElement;

                if (googleLogo) googleLogo.style.display = 'none';
                if (googleBranding) googleBranding.style.display = 'none';
                if (googleHeader) googleHeader.style.display = 'none';
                if (googleLogo || googleBranding) clearInterval(interval);
            }, 500);
        }
    };

    useEffect(() => {
        // Load the Google Translate script dynamically
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);

        // Check if translation cookie exists
        const translationCookie = getCookie('googtrans');
        if (translationCookie) {
            setSelected(translationCookie as string);
        }

        // Set the window function for Translate init
        window.googleTranslateElementInit = googleTranslateElementInit;

        // Cleanup the script on unmount
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Handle language change
    const handleLanguageChange = (value: string) => {
        setCookie('googtrans', value); // Set the language in a cookie
        setSelected(value); // Update state

        window.location.reload(); // Reload the page to apply the language change
    };
    // Find current language details or fallback to default
    const currentLanguage = languages.find(lang => lang.value === selected) || languages[0];
    if (isLoading) {
        <Skeleton className="h-[20px] w-[20px] rounded-xl" />
    }

    return (
        <div className="flex flex-col items-end">
            {/* Google Translate element */}
            <div id="google_translate_element" className="hidden"></div> {/* Hidden Google Translate element */}

            {/* Custom language switcher */}


            <Select
                value={selected}
                onValueChange={handleLanguageChange}
            >
                <SelectTrigger className="flex items-center gap-2 border px-2 py-1 rounded-lg bg-white shadow-sm w-fit">
                    <Image
                        src={currentLanguage.flag}
                        alt={currentLanguage.label}
                        width={20}
                        height={15}
                        priority={true}
                        onLoad={() => setLoading(false)}
                    />
                    <p className="text-primaryColor font-light">
                        {currentLanguage.label}
                    </p>
                    {/* <SelectValue className="flex items-center gap-2 text-gray-800">
                        {currentLanguage.label}
                    </SelectValue> */}
                </SelectTrigger>

                <SelectContent className="bg-white shadow-lg rounded-lg mt-2 w-auto">
                    {languages.map((lang) => (
                        <SelectItem
                            key={lang.value}
                            value={lang.value}
                            className="flex flex-row items-center gap-2 px-4 py-2 w-full"
                        >
                            <Image
                                src={lang.flag}
                                alt={lang.label}
                                width={20}
                                height={15}
                            />
                            <div>{lang.label}</div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default GoogleTranslate;
