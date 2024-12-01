import {
  sig1Base64,
  sig2Base64,
  stampBase64,
  logoBase64,
} from '../components/base64Images'

export const generateCertificateHTML = (data, effectiveDate, expiryDate) => `
  <html>
        <head>
          <title>.test</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
                  </head>
            <div class="max-w-3xl p-4 mx-auto bg-white">
    <header class="pb-4 mb-4 text-center">
      <div class="flex justify-between mb-4 text-sm">
        <div class='flex'>
                          <img src="${logoBase64}" alt="Signature 1" class='h-20' />
          <div class='text-right ml-2'>
          <p class='text-6xl'>Hilal</p>
          <p class='text-sm'>Takaful Nigeria</p>
          <p class='text-sm'>1309373</p>
          </div>
        </div>
        <div class="flex flex-col items-start justify-left">
          <p class='font-bold'>Hilal Takaful Nigeria Limited</p>
          <p>Tel: 09076824451</p>
          <p>enquiries@hilaltakaful.com.ng</p>
          <p>https://hilaltakaful.com.ng</p>
        </div>
      </div>
      <h1 class="text-xl font-bold uppercase">Hilal Takaful Nigeria Limited</h1>
      <h2 class="mt-1 text-md">
        Motor Vehicles (Third Party Insurance) Act 1945 (Nigeria)
      </h2>
    </header>

    <section>
      <h3 class="mb-4 text-lg font-semibold text-center uppercase">
        Certificate of Insurance
      </h3>
      <div class="flex justify-between mb-4 text-sm">
        <div>
          <p>CERTIFICATE NO:<strong>${data?.hilal_certificate_no}</strong></p>
        </div>
        <div>
          <p>POLICY NO:<strong> ${data?.policy_number}</strong></p>
          <p>NAICOM UID:<strong> 095241223021541300</strong></p>
        </div>
      </div>

      <div class="mb-4">
        <p>
          1. Index Mark and Registration No. of Vehicle:<strong> ${data?.vehicle_registration_number}</strong> 
        </p>
        <p>2. Vehicle Make:<strong> ${data?.make} ${data?.model}</strong></p>
        <p>3. Name of Policy Holder:<strong> ${data?.Policy_name}</strong></p>
        <p>4. Effective Date of Commencement of Insurance:
          <strong> ${effectiveDate}</strong> 
        </p>
        <p>
        5. Date of Expiry of Insurance:
          <strong>${expiryDate}</strong> 
        </p>
      </div>

      <div class="mb-4">
        <h4 class="">
          6. Persons or Classes of Persons Entitled To Drive*
        </h4>
        <ul class="mt-1 ml-2 text-sm list-decimal list-inside">
          <li>The Policy holder.</li>
          <li>
            Any other person who is driving on the Policy holder's order or with
            permission, provided they comply with licensing laws.
          </li>
        </ul>
      </div>

      <div class="mb-4">
        <h4 class="">7. Limitation to use: THIRD-PARTY</h4>
        <p class="mt-1 text-sm">
          Use in connection with the Plan holder’s business: permitted for
          carriage of passengers (other than for hire or reward). Use for
          social, domestic, and pleasure purposes allowed.
        </p>
        <p class="mt-2 text-sm">The plan does not cover:</p>
        <ul class="mt-1 text-sm list-decimal list-inside ml-2">
          <li>Use for hire or reward, racing, or pace-making.</li>
          <li>
            Use whilst drawing a trailer except for towing a disabled vehicle.
          </li>
        </ul>
      </div>
    </section>

    <footer class="mt-4">
      <p class="">WAZ 101</p>
      <p class="mb-4 text-sm">
        *Limitations under the Motor Private Third-Party Act 1945 (Nigeria)
        apply.
      </p>

      <div class="flex justify-between py-2 mb-4 text-sm border-black border-t-2 border-b-2">
        <div class="text-center flex flex-col items-start">
          <p>Adekoya Shittu</p>
                  <img src="${sig1Base64}" alt="Signature 1" class='h-10' />
          <p>Hilal Takaful Nigeria Limited</p>
        </div>
        <div class="text-center">
                  <img src="${stampBase64}" alt="Signature 1" class='w-20' />
        </div>
        <div class="text-center flex flex-col items-start">
          <p>Adeniran Thaibat</p>
                  <img src="${sig2Base64}" alt="Signature 2" class='h-10' />
          <p>Hilal Takaful Nigeria Limited</p>
        </div>
      </div>

      <div class="mb-4 text-center">
        <p class='text-sm font-semibold'>PLEASE VERIFY THE STATUS OF YOUR POLICY</p>
        <p class='text-xs'>By SMS text Policy No * Plate No to 33125 or visit www.askniid.org. Remember, if this policy is not on NIID, it could be fake and you may be embarrassed by the law enforcement agents.</p>
      </div>

      <div class="text-sm border-t-2 border-black grid grid-cols-3 gap-5">
      <div class='col-span-1'><p>Hilal Takaful Nigeria Limited</p>
        <p>Tel: 09076824451</p>
        <p>
          Email:
          <a href="mailto:enquiries@hilaltakaful.com.ng" class="text-blue-500"
            >enquiries@hilaltakaful.com.ng</a
          >
        </p></div>
      <div class='col-span-1'><p>
          Website:
          <a href="https://hilaltakaful.com.ng" class="text-blue-500"
            >https://hilaltakaful.com.ng</a
          >
        </p>
        <p>
          Address: 191, Herbert Macaulay Street, Opp. Yaba LGA Secretariat,
          Lagos LAG Nigeria
        </p></div>
        
        
      </div>
    </footer>
  </div>

  <style>
    @media print {
      body {
        background-color: white;
      }

      .max-w-3xl {
        max-width: 100%;
        padding: 0;
        margin: 0;
        page-break-inside: avoid;
      }

      header,
      footer {
        page-break-inside: avoid;
      }
    }
  </style>
</body>

      </html>
`
