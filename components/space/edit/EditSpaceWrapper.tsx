'use client'

import { useEffect, useState } from 'react'
import { useSpaceDataStore } from '@/store/useSpaceDataStore'
import { Space, SpaceDetails } from "@prisma/client"
import { CoverPage } from "@/components/space/create/CoverPage";
import { UserInformation } from "@/components/space/create/UserInformation";
import { TestimonialType } from "@/components/space/create/TestimonialType";
import { TestimonialPage } from "@/components/space/create/TestimonialPage";
import { ThankYouPage } from "@/components/space/create/ThankYouPage";
import { DesignPage } from "@/components/space/create/DesignPage";
import { SpaceCreationDetails } from "@/components/space/create/SpaceCreationDetails";


interface spaceDetail extends Space {
  details: SpaceDetails | null
}

interface EditSpaceWrapperProps {
  currentPage: number
  spaceDetail: spaceDetail,
}

export function EditSpaceWrapper({ currentPage, spaceDetail }: EditSpaceWrapperProps) {
  const { setCoverPage, setSpaceCreationDetails, setUserInformation, setTestimonialType, setTestimonialPageType, setThankYou, setDesign } = useSpaceDataStore()
  const [loading, setLoading] = useState(false)

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <SpaceCreationDetails disabled={true} page="edit" />;
      case 2:
        return <CoverPage slug={spaceDetail.slug} name={spaceDetail.name} />;
      case 3:
        return <UserInformation />;
      case 4:
        return <TestimonialType />;
      case 5:
        return <TestimonialPage />;
      case 6:
        return <ThankYouPage />;
      case 7:
        return <DesignPage />;
      default:
        return <CoverPage slug={spaceDetail.slug} name={spaceDetail.name} />;
    }
  };


  useEffect(() => {
    // Set space creation details
    setSpaceCreationDetails({
      projectName: spaceDetail.name,
      projectSlug: spaceDetail.slug
    })

    // If details exist, populate other store values
    if (spaceDetail.details) {
      setCoverPage({
        title: spaceDetail.details.coverPageTitle,
        description: spaceDetail.details.coverPageDescription,
        logo: spaceDetail.details.coverPageImageUrl || '',
        btnText: spaceDetail.details.coverPageBtnText
      })

      setUserInformation({
        userPhoto: spaceDetail.details.userPhoto,
        firstName: spaceDetail.details.userFirstName,
        lastName: spaceDetail.details.userLastName,
        email: spaceDetail.details.userEmail,
        jobTitle: spaceDetail.details.userJobTitle,
        company: spaceDetail.details.userCompany
      })

      setTestimonialType({
        text: spaceDetail.details.testimonialTextType,
        video: spaceDetail.details.testimonialVideoType
      })

      setTestimonialPageType({
        title: spaceDetail.details.testimonialPageTitle,
        description: spaceDetail.details.testimonialPageDescription,
        tags: spaceDetail.details.tags,
        questionHeader: spaceDetail.details.questionHeader,
        questions: spaceDetail.details.questions
      })

      setThankYou({
        title: spaceDetail.details.thankyouTitle,
        description: spaceDetail.details.thankyouMessage
      })

      setDesign({
        gradientType: spaceDetail.details.theme,
        btnColor: spaceDetail.details.btnColor
      })
    }
  }, [])


  if (loading) {
    return <div>Loading...</div>
  }

  return <>
    {renderPage()}
  </>
}

