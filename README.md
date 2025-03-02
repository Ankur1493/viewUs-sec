# ViewUs - Showcase Your Testimonials with Minimal Effort

ViewUs is a powerful platform that helps businesses seamlessly collect, manage, and showcase customer testimonials. With ViewUs, you can create beautiful testimonial walls, collect video and text testimonials, and import reviews from popular social platforms - all without complex setup or developer assistance.

## 🚀 Features

- **Easy Testimonial Collection**
  - Customizable review forms
  - Support for both text and video testimonials
  - Social import functionality from Twitter, LinkedIn, and Product Hunt

- **Testimonial Management**
  - Centralized dashboard for all testimonials
  - Organize and categorize testimonials
  - Approve, edit, or delete testimonials

- **Beautiful Showcase Options**
  - Wall of Love embedding for websites
  - Responsive and customizable designs
  - Multiple display formats (grid, carousel, etc.)

- **Advanced Options**
  - Analytics and insights
  - Automatic social sharing
  - Customizable branding

## 💻 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Sonner Toasts, Lucide React icons
- **Backend**: Next.js API routes, MongoDB, PostgreSQL
- **Database ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Storage**: AWS S3 and CloudFront
- **Caching**: Upstash Redis
- **Email**: Resend
- **State Management**: Zustand
- **Form Validation**: Zod, React Hook Form
- **Animations**: GSAP, Framer Motion
- **Video Processing**: HLS.js
- **Web Scraping**: Puppeteer (for importing testimonials)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- MongoDB database
- AWS account (for S3 storage)
- Upstash Redis account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ankur1493/viewUs-sec.git
   cd viewUs-sec
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/viewus"
   MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/viewus"

   # Auth
   NEXTAUTH_SECRET="your-secret-here"
   NEXTAUTH_URL="http://localhost:3000"

   # AWS
   AWS_ACCESS_KEY_ID="your-access-key"
   AWS_SECRET_ACCESS_KEY="your-secret-key"
   AWS_REGION="your-region"
   AWS_BUCKET_NAME="your-bucket-name"

   # Redis
   UPSTASH_REDIS_REST_URL="your-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-redis-token"

   # Email
   RESEND_API_KEY="your-resend-api-key"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

The application uses Next.js App Router structure:

- `app/`: Main application routes and layouts
  - `(marketing)/`: Landing pages and marketing content
  - `(routes)/`: Authenticated routes and functionality
  - `api/`: API endpoints
- `components/`: Reusable UI components
- `lib/`: Utility functions and services
- `data/`: Data access functions
- `models/`: MongoDB schema models
- `schemas/`: Zod validation schemas
- `public/`: Static assets
- `prisma/`: Database schema and migrations

## 📊 Key Functionality

### Testimonial Collection

ViewUs provides customizable forms for collecting testimonials from customers. Users can:
- Create branded collection forms
- Collect both text and video testimonials
- Import existing testimonials from social platforms

### Testimonial Management

The dashboard provides a central place to manage all testimonials:
- View, approve, or delete testimonials
- Organize testimonials by categories
- Track testimonial performance

### Wall of Love

Create beautiful walls of testimonials for embedding in websites:
- Customizable designs and layouts
- Responsive displays for all devices
- Easy embed code generation

### Import Functionality

Import testimonials directly from social platforms:
- Twitter/X posts and comments
- LinkedIn recommendations
- Product Hunt reviews

## 📝 Plans and Pricing

- **Free Plan**:
  - Up to 15 text testimonials
  - 2 video testimonials
  - Basic wall of love embedding
  - Personalized support

## 🌐 Deployment

ViewUs is configured for easy deployment on Vercel:

1. Fork this repository
2. Connect your fork to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## 🤝 Contribution Guidelines

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a pull request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## ❓ FAQs

**Q: How do I import testimonials from social media?**  
A: Use the import functionality in the dashboard to connect your social media accounts and select the posts or reviews you want to import.

**Q: Can I customize the look of my testimonial wall?**  
A: Yes, ViewUs offers various customization options for testimonial walls, including layout, colors, and fonts.

**Q: Is there a limit to the number of testimonials I can collect?**  
A: The free plan has limits, but the Pro plan offers unlimited text testimonials and more video testimonials.

## 📞 Support

Need help? Have questions?

- Email: [team@viewus.in](mailto:team@viewus.in)
- Book a call: [Cal.com/ankur-sharma/15min](https://cal.com/ankur-sharma/15min)
- Follow us on Twitter: [@ankursharma1493](https://x.com/ankursharma1493)
- GitHub: [Ankur1493/viewUs-sec](https://github.com/Ankur1493/viewUs-sec)

## 🙏 Acknowledgments

- Thanks to the Next.js team for their amazing framework.
- Special thanks to all contributors and users who have supported ViewUs.

## 📄 License

This project is proprietary and not open for redistribution.

---

Built with ❤️ by the ViewUs team