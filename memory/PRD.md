# Dr Plumber JB - Product Requirements Document

## Original Problem Statement
Build a modern, high-converting website for Dr Plumber (Tukang Paip) JB - a 24/7 plumbing service in Johor Bahru, Malaysia. Target audience: homeowners, landlords, restaurants, and businesses needing fast plumbing repairs.

## User Personas
1. **Homeowners** - Need emergency plumbing fixes quickly
2. **Landlords** - Require reliable plumbing services for rental properties
3. **Restaurant/Business Owners** - Need professional plumbing to minimize downtime

## Core Requirements (Static)
- Language: Bahasa Malaysia only
- Simple contact form (Name, Phone, Message)
- Actual Google Maps embed
- Mobile-first responsive design
- 24/7 emergency service branding
- WhatsApp and phone call CTAs

## Business Info
- Name: Dr Plumber (Tukang Paip) JB
- Phone: 013-781 7454
- Address: No 4, 9, Jalan Laman Indah, Taman Laman Indah, 81300 Johor Bahru, Johor
- Rating: 4.8★ (37 Reviews)
- Hours: Open 24 Hours

## What's Been Implemented (March 24, 2026)
- ✅ Hero section with emergency badge, trust badges, and dual CTAs
- ✅ Navigation with smooth scrolling
- ✅ About section with professional plumber image
- ✅ Services section with 6 service cards (Bento grid)
- ✅ Testimonials section with 4 Google-style review cards
- ✅ Gallery section with masonry layout
- ✅ Urgent CTA section with emergency styling
- ✅ Contact section with Google Maps + simple form
- ✅ Footer with contact info
- ✅ Floating WhatsApp button
- ✅ Mobile sticky CTA bar
- ✅ Backend /api/contact endpoint with MongoDB storage
- ✅ Toast notifications for form submissions

## Tech Stack
- Frontend: React + Tailwind CSS + Shadcn UI
- Backend: FastAPI + Motor (MongoDB async)
- Database: MongoDB

## Prioritized Backlog

### P0 (Critical) - DONE
- Core website sections
- Contact form functionality
- Mobile responsiveness

### P1 (High)
- Add WhatsApp chat widget with pre-filled message
- SEO meta tags optimization
- Add service area coverage map

### P2 (Medium)
- Admin dashboard to view contact submissions
- Image gallery lightbox
- Service request booking calendar

## Next Tasks
1. Add SEO meta tags (title, description, Open Graph)
2. Add structured data (LocalBusiness schema)
3. Consider adding before/after gallery
4. Add FAQ section for common plumbing questions
