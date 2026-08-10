import Image from "next/image";

const recognitionMarks = [
  { src: "/reflexion-assets/awards/partnerLogo-NUSMedicineDigitalAdvancedTechnologyAccelerator(DATA)-fe4fd070-6cb0-471c-828c-4b523dff2129.png", alt: "HealthHack Singapore" },
  { src: "/reflexion-assets/awards/tigerlaunch_logo.jpeg", alt: "TigerLaunch Asia" },
  { src: "/reflexion-assets/awards/images.png", alt: "Mapletree" },
  { src: "/reflexion-assets/awards/Huawei_Standard_logo.svg.webp", alt: "Huawei" },
  { src: "/reflexion-assets/awards/medtech actuator.jpeg", alt: "MedTech Actuator" },
  { src: "/reflexion-assets/awards/blk 71 1.png", alt: "BLOCK71" },
] as const;

export function RecognitionStrip({ title, note, items, heading = "RECOGNISED FOR INNOVATION AND IMPACT" }: { title: string; note: string; items: readonly string[]; heading?: string }) {
  return <div className="recognition" aria-labelledby="recognition-title" data-motion-item>
    <div className="recognition__heading"><p className="eyebrow">{heading}</p><h3 id="recognition-title">{title}</h3><p>{note}</p></div>
    <ul>{items.map((item, index) => {
      const mark = recognitionMarks[index];
      return <li key={item}>
        <div className="recognition__mark">
          <Image src={mark.src} alt={mark.alt} fill sizes="(max-width: 520px) 38vw, (max-width: 820px) 22vw, 12vw"/>
        </div>
        <p>{item}</p>
      </li>;
    })}</ul>
  </div>;
}
