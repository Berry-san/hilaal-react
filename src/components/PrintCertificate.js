import React from 'react'

const PrintCertificate = () => {
  const handlePrint = () => {
    const handlePrint = () => {
      // Create a new window and document
      const printWindow = window.open('', '_blank')
      printWindow.document.open()

      // Generate the HTML content for printing
      const htmlContent = `
      <html>
        <head>
          <title>Print transactions</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1rem;
              }
              th, td {
                padding: 0.5rem;
                border-bottom: 1px solid #ddd;
              }
              th {
                text-align: left;
              }
            }
          </style>
        </head>
            <body class="bg-gray-100">
        <div class="max-w-4xl mx-auto bg-white p-8 border border-gray-300 shadow-lg">
            <header class="text-center border-b-2 border-black pb-6 mb-6">
                <h1 class="text-2xl font-bold uppercase">Hilal Takaful Nigeria Limited</h1>
                <h2 class="text-lg mt-2">Motor Vehicles (Third Party Insurance) Act 1945 (Nigeria)</h2>
            </header>

            <section>
                <h3 class="text-center text-xl uppercase font-semibold mb-6">Certificate of Insurance</h3>
                <div class="mb-6">
                    <p><strong>CERTIFICATE NO:</strong> WAZ 101/2024/004116</p>
                    <p><strong>POLICY NO:</strong> PTMLAG21060007</p>
                    <p><strong>NAICOM UID:</strong> 095241223021541300</p>
                </div>

                <div class="mb-6">
                    <p><strong>1. Index Mark and Registration No. of Vehicle:</strong> SBG 176 DP</p>
                    <p><strong>2. Vehicle Make:</strong> Toyota 4runner jeep</p>
                    <p><strong>3. Name of Policy Holder:</strong> MR ADISA ADAM OLANIYI</p>
                    <p><strong>4. Effective Date of Commencement of Insurance:</strong> 11 September, 2024</p>
                    <p><strong>5. Date of Expiry of Insurance:</strong> 10 September, 2025</p>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold">6. Persons or Classes of Persons Entitled To Drive*</h4>
                    <ul class="list-disc list-inside mt-2">
                        <li>The Policy holder.</li>
                        <li>Any other person who is driving on the Policy holder's order or with permission, provided they comply with licensing laws.</li>
                    </ul>
                </div>

                <div class="mb-6">
                    <h4 class="font-semibold">7. Limitation to use: THIRD-PARTY</h4>
                    <p class="mt-2">Use in connection with the Plan holder’s business: permitted for carriage of passengers (other than for hire or reward). Use for social, domestic, and pleasure purposes allowed.</p>
                    <p class="mt-2">The plan does not cover:</p>
                    <ul class="list-disc list-inside mt-2">
                        <li>Use for hire or reward, racing, or pace-making.</li>
                        <li>Use whilst drawing a trailer except for towing a disabled vehicle.</li>
                    </ul>
                </div>
            </section>

            <footer class="border-t-2 border-black pt-6 mt-6">
                <p class="text-lg font-bold mb-6">WAZ 101</p>
                <p class="mb-6">*Limitations under the Motor Private Third-Party Act 1945 (Nigeria) apply.</p>

                <div class="flex justify-between mb-6">
                    <p class="text-center">
                        <strong>Adekoya Shittu</strong><br>
                        Hilal Takaful Nigeria Limited
                    </p>
                    <p class="text-center">
                        <strong>Adeniran Thaibat</strong><br>
                        Hilal Takaful Nigeria Limited
                    </p>
                </div>

                <div class="text-center font-semibold mb-6">
                    <p>PLEASE VERIFY THE STATUS OF YOUR POLICY</p>
                    <p>By SMS text Policy No * Plate No to 33125 or visit www.askniid.org.</p>
                    <p>If this policy is not on NIID, it may be fake, and you could face legal consequences.</p>
                </div>

                <div class="text-center">
                    <p>Hilal Takaful Nigeria Limited</p>
                    <p>Tel: 09076824451</p>
                    <p>Email: <a href="mailto:enquiries@hilaltakaful.com.ng" class="text-blue-500">enquiries@hilaltakaful.com.ng</a></p>
                    <p>Website: <a href="https://hilaltakaful.com.ng" class="text-blue-500">https://hilaltakaful.com.ng</a></p>
                    <p>Address: 191, Herbert Macaulay Street, Opp. Yaba LGA Secretariat, Lagos LAG Nigeria</p>
                </div>
            </footer>
        </div>
        </body>
      </html>
    `

      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.print()
    }
  }
  return <div>PrintCertificate</div>
}

export default PrintCertificate
