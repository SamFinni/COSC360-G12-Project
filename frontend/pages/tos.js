import Head from 'next/head';
import dynamic from "next/dynamic";
import styles from '../styles/pages/HomePage.module.css';
import Footer from '../components/Footer';
const Header = dynamic(() => import('../components/Header'), {
  ssr: false
});
const Navbar = dynamic(() => import('../components/Navbar'), {
  ssr: false
});

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Blogaru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Navbar />

      <div className={styles.container}>
        <div className={styles.postlist}>
          <h2>Terms of Service</h2>
          <p>We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use and disclosure of Personal Information. Our privacy policy is based upon the values set by the Canadian Standards Association's Model Code for the Protection of Personal Information and Canada's Personal Information Protection and Electronic Documents Act.</p>
          <br></br>

          <h4>1. Introduction</h4>
          <p>This website is operated by the Illuminati. The terms “we”, “us”, and “our” refer to the Illuminati. The use of our website is subject to the following terms and conditions of use, as amended from time to time (the “Terms”). The Terms are to be read together by you with any terms, conditions or disclaimers provided in the pages of our website. Please review the Terms carefully. The Terms apply to all users of our website, including without limitation, users who are browsers, customers, merchants, vendors and/or contributors of content. If you access and use this website, you accept and agree to be bound by and comply with the Terms and our Privacy Policy. If you do not agree to the Terms or our Privacy Policy, you are not authorized to access our website, use any of our website’s services or place an order on our website.</p>
          <h4>2. Use of our Website</h4>
          <p> You agree to use our website for legitimate purposes and not for any illegal or unauthorized purpose, including without limitation, in violation of any intellectual property or privacy law. By agreeing to the Terms, you represent and warrant that you are at least the age of majority in your state or province of residence and are legally capable of entering into a binding contract.</p>
          <p>You agree to not use our website to conduct any activity that would constitute a civil or criminal offence or violate any law. You agree not to attempt to interfere with our website’s network or security features or to gain unauthorized access to our systems.</p>
          <p>You agree to provide us with accurate personal information, such as your email address, mailing address and other contact details in order to complete your order or contact you as needed. You agree to promptly update your account and information. You authorize us to collect and use this information to contact you in accordance with our Privacy Policy.</p>
          <h4>3. General Conditions </h4>
          <p>We reserve the right to refuse service to anyone, at any time, for any reason. We reserve the right to make any modifications to the website, including terminating, changing, suspending or discontinuing any aspect of the website at any time, without notice. We may impose additional rules or limits on the use of our website. You agree to review the Terms regularly and your continued access or use of our website will mean that you agree to any changes.</p>
          <p>You agree that we will not be liable to you or any third party for any modification, suspension or discontinuance of our website or for any service, content, feature or product offered through our website.</p>
          <h4>4. Products or Services</h4>
          <p>All purchases through our website are subject to product availability. We may, in our sole discretion, limit or cancel the quantities offered on our website or limit the sales of our products or services to any person, household, geographic region or jurisdiction.</p>
          <p>Prices for our products are subject to change, without notice. Unless otherwise indicated, prices displayed on our website are quoted in Canadian dollars.</p>
          <p>We reserve the right, in our sole discretion, to refuse orders, including without limitation, orders that appear to be placed by distributors or resellers. If we believe that you have made a false or fraudulent order, we will be entitled to cancel the order and inform the relevant authorities.</p>
          <p>We do not guarantee the accuracy of the colour or design of the products on our website. We have made efforts to ensure the colour and design of our products are displayed as accurately as possible on our website.</p>
          <h4>5. Links to Third-Party Websites</h4>
          <p> Links from or to websites outside our website are meant for convenience only. We do not review, endorse, approve or control, and are not responsible for any sites linked from or to our website, the content of those sites, the third parties named therein, or their products and services. Linking to any other site is at your sole risk and we will not be responsible or liable for any damages in connection with linking. Links to downloadable software sites are for convenience only and we are not responsible or liable for any difficulties or consequences associated with downloading the software. Use of any downloaded software is governed by the terms of the license agreement, if any, which accompanies or is provided with the software.</p>
          <h4>6. Use Comments, Feedback, and Other Submissions</h4>
          <p>You acknowledge that you are responsible for the information, profiles, opinions, messages, comments and any other content (collectively, the “Content”) that you post, distribute or share on or through our website or services available in connection with our website. You further acknowledge that you have full responsibility for the Content, including but limited to, with respect to its legality, and its trademark, copyright and other intellectual property ownership.</p>
          <p>You agree that any Content submitted by you in response to a request by us for a specific submission may be edited, adapted, modified, recreated, published, or distributed by us. You further agree that we are under no obligation to maintain any Content in confidence, to pay compensation for any Content or to respond to any Content.</p>
          <p>You agree that you will not post, distribute or share any Content on our website that is protected by copyright, trademark, patent or any other proprietary right without the express consent of the owner of such proprietary right. You further agree that your Content will not be unlawful, abusive or obscene nor will it contain any malware or computer virus that could affect our website’s operations. You will be solely liable for any Content that you make and its accuracy. We have no responsibility and assume no liability for any Content posted by you or any third-party.</p>
          <p>We reserve the right to terminate your ability to post on our website and to remove and/or delete any Content that we deem objectionable. You consent to such removal and/or deletion and waive any claim against us for the removal and/or deletion of your Content.</p>
          <h4>7. Your Personal Information</h4>
          <p>Please see our Privacy Policy to learn about how we collect, use, and share your personal information.</p>
          <h4>8. Entire Agreement</h4>
          <p>The Terms and any documents expressly referred to in them represent the entire agreement between you and us in relation to the subject matter of the Terms and supersede any prior agreement, understanding or arrangement between you and us, whether oral or in writing. Both you and we acknowledge that, in entering into these Terms, neither you nor we have relied on any representation, undertaking or promise given by the other or implied from anything said or written between you and us prior to such Terms, except as expressly stated in the Terms.</p>
          <h4>10. Handling Customer Complaints and Suggestions</h4>
          <p>You may direct any questions or enquiries with respect to our privacy policy or our practices by contacting </p>
          <br></br>
          <h4>Additional Information</h4>
          <p>Sample terms of service provided by <a href="https://developer.moneris.com/en/More/Compliance/Sample%20Terms%20of%20Use">Moneris</a></p>

        </div>
      </div>

      <Footer />
    </div>
  )
}