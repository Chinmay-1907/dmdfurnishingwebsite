import React, { useEffect } from 'react';
import SEO from './SEO';
import styles from '../styles/WebsitePolicies.module.css';

const WebsitePolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.policiesContainer}>
      <SEO 
        title="Website Policies | DMD Furnishing"
        description="Review the website policies, terms of use, and disclaimers for the DMD Furnishing website. Understand the conditions of using our services and content."
        canonical="https://dmdfurnishing.com/website-policies"
      />
      <div className={styles.pageHeader}>
        <h1>Website Policies</h1>
      </div>
      <div className={styles.policiesContent}>
        <section>
          <h2>1. Terms of Use</h2>
          <p>Welcome to the DMD Furnishing website (the "Site"). By accessing or using our Site, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Site.</p>
          <p>The content and materials on this Site, including but not limited to text, graphics, images, and project details ("Content"), are for informational purposes only. The Content is not intended to be a substitute for professional advice, whether in design, engineering, or otherwise. Always seek the advice of a qualified professional with any questions you may have regarding a project.</p>
        </section>

        <section>
          <h2>2. Disclaimer of Warranties</h2>
          <p>The information, products, and services on this Site are provided on an "as is," "where is," and "where available" basis. DMD Furnishing makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <p>Further, DMD Furnishing does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site. Project details, including timelines, materials, and quantities, are illustrative examples and are subject to change without notice. Final specifications will be determined in a formal agreement.</p>
        </section>

        <section>
          <h2>3. Limitation of Liability</h2>
          <p>In no event shall DMD Furnishing or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DMD Furnishing's website, even if DMD Furnishing or a DMD Furnishing authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </section>

        <section>
          <h2>4. Accuracy of Materials & Information</h2>
          <p>The materials appearing on our Site could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our Site are accurate, complete, or current. We may make changes to the materials contained on our Site at any time without notice. However, we do not make any commitment to update the materials.</p>
        </section>
        
        <section>
          <h2>5. User Agreement</h2>
          <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
        </section>

        <section>
          <h2>6. Governing Law</h2>
          <p>Any claim relating to DMD Furnishing's website shall be governed by the laws of the Commonwealth of Massachusetts without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2>7. Changes to These Policies</h2>
          <p>DMD Furnishing may revise these website policies at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these policies.</p>
          <p><em>Last Updated: February 16, 2026</em></p>
        </section>
      </div>
    </div>
  );
};

export default WebsitePolicies;
