import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const { userData, backendUrl } = useContext(AppContext);
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!userData) {
      toast.dismiss();
      toast.error("Please login to send message");
      return;
    }

    if (!details || !userData.name || !userData.email) {
      toast.dismiss();
      toast.error("Please fill all the required fields");
      return;
    }

    setIsSending(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/message/send-message`, {
        name: userData.name,
        email: userData.email,
        phone,
        subject,
        message: details,
      });

      if (data.success) {
        toast.success(data.message);
        setPhone("");
        setSubject("");
        setDetails("");
      } else {
        toast.dismiss();
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Server error");
      console.log("Error sending message:", error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50 px-6 py-10 lg:py-[60px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap lg:justify-between">
          {/* Left side - Contact Info */}
          <div className="w-full pl-40 lg:w-1/2 xl:w-6/12">
            <div className="mb-12 max-w-[570px] lg:mb-0">
              <span className="mb-4 block text-base font-semibold text-primary">
                Contact Us
              </span>
              <h2 className="mb-6 text-[32px] font-bold uppercase text-dark sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                GET IN TOUCH WITH US
              </h2>
              <p className="mb-9 text-base leading-relaxed text-body-color">
                If you are having any problem or want to report something or provide suggestions
                to improve in our web applications then, feel free to contact us.
              </p>

              <ContactInfo
                icon={LocationIcon}
                title="Our Location"
                description="Biratnagar, Nepal"
              />
              <ContactInfo
                icon={PhoneIcon}
                title="Phone Number"
                description="+977 9804359905"
              />
              <ContactInfo
                icon={EmailIcon}
                title="Email Address"
                description="Hamroaadhiyan@gmail.com"
              />
            </div>
        </div>

          {/* Right side - Contact Form */}
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="relative rounded-lg bg-white p-6 shadow-lg sm:p-12">
              <form onSubmit={handleSendMessage}>
                <ContactControlInputBox
                  type="text"
                  value={userData ? userData.name : "Please Log in to send message"}
                  name="name"
                  placeholder="Your Name"
                  readOnly={true}
                />
                <ContactControlInputBox
                  type="text"
                  name="email"
                  value={userData ? userData.email : "Please Log in to send message"}
                  placeholder="Your Email"
                  readOnly={true}
                />
                <ContactInputBox
                  type="tel"
                  name="phone"
                  value={phone}
                  placeholder="Your Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <ContactInputBox
                  type="text"
                  name="subject"
                  value={subject}
                  placeholder="Subject Here"
                  onChange={(e) => setSubject(e.target.value)}
                />
                <ContactTextArea
                  row="6"
                  placeholder="Your Message"
                  name="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
                <div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full rounded-2xl border border-primary bg-pink-600 p-3 text-white transition hover:bg-opacity-90"
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// Input components
const ContactTextArea = ({ row, placeholder, name, onChange, value }) => (
  <div className="mb-6">
    <textarea
      rows={row}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
    />
  </div>
);

const ContactInputBox = ({ type, placeholder, onChange, name, value, readOnly }) => (
  <div className="mb-4">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
    />
  </div>
);

const ContactControlInputBox = ({ type, placeholder, onChange, name, value, readOnly }) => (
  <div className="mb-4">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
      value={value}
      readOnly={readOnly}
      className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary"
    />
  </div>
);

// Contact info component
const ContactInfo = ({ icon: Icon, title, description }) => (
  <div className="mb-8 flex w-full max-w-[370px]">
    <div className="mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:max-w-[70px]">
      <Icon />
    </div>
    <div className="w-full">
      <h4 className="mb-1 text-xl font-bold text-dark">{title}</h4>
      <p className="text-base text-body-color">{description}</p>
    </div>
  </div>
);

// Icons as components
const LocationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M30.6 11.8002L17.7 3.5002C16.65 2.8502 15.3 2.8502 14.3 3.5002L1.39998 11.8002C0.899983 12.1502 0.749983 12.8502 1.04998 13.3502C1.39998 13.8502 2.09998 14.0002 2.59998 13.7002L3.44998 13.1502V25.8002C3.44998 27.5502 4.84998 28.9502 6.59998 28.9502H25.4C27.15 28.9502 28.55 27.5502 28.55 25.8002V13.1502L29.4 13.7002C29.6 13.8002 29.8 13.9002 30 13.9002C30.35 13.9002 30.75 13.7002 30.95 13.4002C31.3 12.8502 31.15 12.1502 30.6 11.8002ZM13.35 26.7502V18.5002C13.35 18.0002 13.75 17.6002 14.25 17.6002H17.75C18.25 17.6002 18.65 18.0002 18.65 18.5002V26.7502H13.35ZM26.3 25.8002C26.3 26.3002 25.9 26.7002 25.4 26.7002H20.9V18.5002C20.9 16.8002 19.5 15.4002 17.8 15.4002H14.3C12.6 15.4002 11.2 16.8002 11.2 18.5002V26.7502H6.69998C6.19998 26.7502 5.79998 26.3502 5.79998 25.8502V11.7002L15.5 5.4002C15.8 5.2002 16.2 5.2002 16.5 5.4002L26.3 11.7002V25.8002Z"
      fill="currentColor"
    />
  </svg>
);

const PhoneIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.62 10.79C8.06 13.99 10.98 16.91 14.18 18.35L16.27 16.27C16.66 15.88 17.26 15.8 17.69 16.06C19.19 17 21.03 17.5 23 17.5C23.55 17.5 24 17.95 24 18.5V23C24 23.55 23.55 24 23 24C10.85 24 0 13.15 0 1C0 0.45 0.45 0 1 0H5.5C6.05 0 6.5 0.45 6.5 1C6.5 3.97 7 5.81 7.94 7.31C8.2 7.74 8.12 8.34 7.73 8.73L5.62 10.84Z"
        fill="currentColor"
      />
    </svg>
  );
  

  const EmailIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
        fill="currentColor"
      />
    </svg>
  );
  
