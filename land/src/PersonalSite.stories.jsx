import React from "react";
import { FeaturedProject, PersonalSite, PhotoGallery, SiteHeader, SiteFooter, TravelPage } from "./PersonalSite.jsx";
import { featuredProjects } from "./personal-content.js";

export default { title: "Personal Index/Site", component: PersonalSite, parameters: { layout: "fullscreen" } };
export const Home = { args: { initialPage: "home" } };
export const Creative = { args: { initialPage: "creative" } };
export const Publications = { args: { initialPage: "publications" } };
export const AllWriting = { args: { initialPage: "writing" } };
export const Travels = { args: { initialPage: "travels" } };
const phone = (story) => <iframe title="390 pixel phone preview" src={`./iframe.html?id=personal-index-site--${story}&viewMode=story`} style={{ display: "block", width: 390, maxWidth: "100%", height: 844, border: 0, margin: "0 auto" }} />;
export const MobileHome = { render: () => phone("home") };
export const MobileTravels = { render: () => phone("travels") };

const frame = (children) => <div className="personal-site"><div className="personal-container">{children}</div></div>;
export const Header = { render: () => frame(<SiteHeader />) };
export const HeaderOpen = { render: () => frame(<SiteHeader initiallyOpen />) };
export const MobileNavigationOpen = { render: () => phone("header-open") };
export const FeaturedDatingBounty = { render: () => frame(<FeaturedProject project={featuredProjects[2]} />) };
export const Footer = { render: () => frame(<SiteFooter />) };
export const UnitedStatesTravels = { render: () => frame(<TravelPage initialView="us" />) };
export const MobileUnitedStatesTravels = { render: () => phone("united-states-travels") };

export const PhotosCollapsed = { render: () => frame(<PhotoGallery />) };
export const PhotosExpanded = { render: () => frame(<PhotoGallery initiallyExpanded />) };
