import { OrganizationList } from "@clerk/nextjs";

 function CreateOrganizationPage() {
  return <OrganizationList 
  hidePersonal
  afterSelectOrganizationUrl="/organizations/:id"
  afterCreateOrganizationUrl="/organizations/:id"
  />;
}

export default CreateOrganizationPage;