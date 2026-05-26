*Question 1*  

 
From: marissa@startup.com  
Subject:  Bad design  

Hello,  
  
Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.  
   
Thanks,  
Marissa  



Hello Marissa,

Thank you for sharing this feedback — and no worries, we absolutely want to hear this kind of input.

I completely understand the frustration, especially when you are iterating frequently and relying on actions like clearing or deleting indexes as part of your workflow. Adding extra clicks to commonly used actions can definitely slow things down.

The intention behind the new dashboard design was to improve overall navigation and reduce the risk of accidental destructive actions, but feedback like yours is very valuable because it helps us understand where the new flow may be creating friction for power users.

I’ve shared your feedback with the team, particularly around the increased number of steps required for index management actions during development and testing workflows.

If there are any updates or improvements made around this experience, we’ll be happy to keep you informed. And please do continue sharing any additional feedback you may have as you keep using the new dashboard — it’s genuinely helpful for the team as we continue improving the experience.

We really appreciate you taking the time to share this.

Best regards,
Dragana
  
--

*Question 2*:   
  
From: carrie@coffee.com  
Subject: URGENT ISSUE WITH PRODUCTION!!!!  
  
Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".  
  
Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?  
  
Please advise on how to fix this. Thanks.   



Hello Carrie,

Thank you for your message, and apologies for the inconvenience caused to your users.

This error is expected behaviour in Algolia and occurs when an individual record exceeds the maximum allowed size limit (approximately 10KB per record).

In your case, the issue is very likely caused by non-searchable metadata being included in your records (for example: large nested objects, user data, analytics payloads, or other application-level information).

To fix this, you will need to adjust your indexing strategy so that only search-relevant fields are sent to Algolia.

A good rule of thumb is:

If a field is not needed for searching, filtering, sorting, or displaying results, it should not be included in the Algolia record.

This will ensure that payload sizes remain within limits and prevent the error from occurring.

Please ensure your indexed records only include fields needed for search results, such as:

- review_text
- rating
- shop_name
- city

If you would like, I can review one of your example records and suggest exactly what should remain in Algolia and what should be removed. This usually makes the fix very quick.

I hope this helps, and we look forward to hearing from you.

Best regards,
Dragana
  
--

*Question 3*:   


From: marc@hotmail.com  
Subject: Error on website  
  
Hi, my website is not working and here's the error:  
  
![error message](./error.png)  
  
Can you fix it please?  



Hello Marc,

Yes, we can help you get this fixed.

This error is caused by a broken reference to Searchkit in your site’s code. It usually happens after a recent change or deployment where Searchkit was removed or not loaded correctly.

To resolve this, could you share either:

- access to your codebase (GitHub / repository / CMS), or
- access to your deployment platform (e.g. Vercel, Netlify, Shopify theme files)

If your developer is not available, you can share access to the code and we will:

- identify where Searchkit is still being referenced
- remove or restore the missing dependency
- rebuild and confirm the site is working again

Alternatively, we can also jump on a quick call and go through it together.

This is usually a quick fix once we have access, and we’ll make sure everything is back up and running smoothly for you.

Best regards,
Dragana
