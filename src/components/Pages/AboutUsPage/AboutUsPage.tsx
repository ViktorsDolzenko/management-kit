import React from 'react';
import { Layout } from "../../layout/Layout";
import { useTranslation } from "react-i18next";
import './aboutUsPage.scss';
import { useMediaQuery } from "react-responsive";

export const AboutUsPage = () => {
    const { t } = useTranslation();

    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-device-width: 768px)"
    });

    // hook to switch media query
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <Layout pageTitle={t('phrases.About')}>
            <div className="about-us">
                <div className="about-us__info">
                    <address className="about-us__info--address"><span>{t('phrases.Address')}: </span> Krišjāņa Valdemāra iela 1C, Centra rajons, Rīga, LV-1010 </address>
                    <span className="about-us__info--phone"><span>{t('phrases.phoneNumber')}:</span>  <a href="tel:+37173738228">+37173738228</a> </span>
                </div>
                {isDesktopOrLaptop &&
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384.62164530432983!2d24.10442020597522!3d56.95310856455913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1a2d6eccd67bc666!2sRVT%20Cafe!5e0!3m2!1sru!2slv!4v1644156857670!5m2!1sru!2slv"
                    width="800" height="600" style={{ border: "0" }} allowFullScreen loading="lazy"/>
                }
                {isTabletOrMobile &&
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384.62164530432983!2d24.10442020597522!3d56.95310856455913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1a2d6eccd67bc666!2sRVT%20Cafe!5e0!3m2!1sru!2slv!4v1644156857670!5m2!1sru!2slv"
                    width="500" height="400" style={{ border: "0" }} allowFullScreen loading="lazy"/>
                }
            </div>
        </Layout>
    );
};
