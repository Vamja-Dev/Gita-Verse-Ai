# backend/seed_characters.py
from database.connection import get_db

def seed_characters():
    db = get_db()
    
    characters_data = [
        # --- DIVINE GROUP ---
        {
            "id": "ganesha",
            "name": "God Ganesha",
            "sanskritName": "भगवान गणेश",
            "title": "The Remover of Obstacles & Scribe",
            "faction": "DIVINE",
            "description": "The elephant-headed deity of wisdom who traditionally wrote down the Mahabharata as sage Vyasa dictated it.",
            "summary": "The elephant-headed deity of wisdom who traditionally wrote down the Mahabharata as sage Vyasa dictated it.",
            "theme": "The Remover of Obstacles & Scribe",
            "highlights": [
                "Acted as the divine scribe to write down the entire Mahabharata epic without a single pause",
                "Embodying supreme intellect (Buddhi) and spiritual discrimination (Viveka)",
                "Worshipped first across Vedic traditions to ensure the smooth removal of obstacles"
            ],
            "keyPoints": [
                "Acted as the divine scribe to write down the entire Mahabharata epic without a single pause",
                "Embodying supreme intellect (Buddhi) and spiritual discrimination (Viveka)",
                "Worshipped first across Vedic traditions to ensure the smooth removal of obstacles"
            ],
            "fullDetails": [
                "God Ganesha occupies a monumental place in the framing of the Mahabharata. When Sage Ved Vyasa sought a scribe capable of recording his vast epic without stopping, Brahma directed him to invoke Ganesha, the God of beginnings and intellect.",
                "Ganesha agreed under the brilliant condition that Vyasa’s recitation must never falter or pause. In response, Vyasa imposed a counter-condition: Ganesha must comprehend every verse before writing it down. This cosmic intellectual exchange ensured that the epic carries profound layers of hidden philosophical truth.",
                "As an elephant-headed deity, His form is deeply symbolic: His large ears represent deep listening, His small eyes symbolize focused concentration, and His broken tusk signifies the sacrifice of ego for higher knowledge."
            ],
            "spiritualSignificance": "Represents Buddhi (intellect) and Vivek (discrimination), essential inner qualities required to understand the profound metaphysical truths revealed in the Bhagavad Gita.",
            "gitaConnection": "Represents Buddhi (intellect) and Vivek (discrimination), essential inner qualities required to understand the profound metaphysical truths revealed in the Bhagavad Gita.",
            "keyTeaching": "Wisdom, acute concentration, and inner focus overcome any obstacle on the spiritual path.",
            "image": "/uploads/ganesha.png"
        },
        {
            "id": "ved-vyasa",
            "name": "Sage Ved Vyasa",
            "sanskritName": "महर्षि वेद व्यास",
            "title": "The Divine Compiler & Author",
            "faction": "DIVINE",
            "description": "The legendary sage who composed the epic Mahabharata and witnessed the entire history unfold.",
            "summary": "The legendary sage who composed the epic Mahabharata and witnessed the entire history unfold.",
            "theme": "The Divine Compiler & Author",
            "highlights": [
                "Compiled and divided the primordial single Veda into four distinct branches",
                "Personally witnessed and chronicled the entire generational saga of the Kuru dynasty",
                "Regarded as an incarnation of God Vishnu in the form of a literary preceptor"
            ],
            "keyPoints": [
                "Compiled and divided the primordial single Veda into four distinct branches",
                "Personally witnessed and chronicled the entire generational saga of the Kuru dynasty",
                "Regarded as an incarnation of God Vishnu in the form of a literary preceptor"
            ],
            "fullDetails": [
                "Born as Krishna Dvaipayana on an island in the Yamuna, sage Ved Vyasa is the literary titan behind India’s greatest spiritual epics and Puranas. His title 'Vyasa' means 'compiler' or 'divider', reflecting his monumental work in organizing human spiritual knowledge.",
                "Vyasa was not merely an objective historian of the Mahabharata; He was an active catalyst in the Kuru lineage, granting divine boons and guiding characters through moral crises. He appears at critical junctures to counsel Dhritarashtra, Yudhishthira, and Kunti.",
                "His life represents the bridge between eternal cosmic law and written scripture, ensuring that future generations grappling with moral decay would always have a lighthouse of wisdom to consult."
            ],
            "spiritualSignificance": "As the compiler of the Vedas and narrator of the epic, Vyasa embodies the ultimate transmission of spiritual knowledge from higher realms down to humanity.",
            "gitaConnection": "As the compiler of the Vedas and narrator of the epic, Vyasa embodies the ultimate transmission of spiritual knowledge from higher realms down to humanity.",
            "keyTeaching": "Scriptures serve as the eternal lighthouse guiding human consciousness through illusion.",
            "image": "/uploads/vyasa.png"
        },
        {
            "id": "krishna",
            "name": "God Krishna",
            "sanskritName": "श्रीकृष्ण",
            "title": "The Supreme Guide & Charioteer",
            "faction": "DIVINE",
            "description": "The eighth avatar of God Vishnu, embodiment of supreme wisdom, divine love, and cosmic strategy.",
            "summary": "The eighth avatar of God Vishnu, embodiment of supreme wisdom, divine love, and cosmic strategy.",
            "theme": "The Supreme Guide & Charioteer",
            "highlights": [
                "Delivered the 700 verses of the Bhagavad Gita on the battlefield of Kurukshetra",
                "Served as Arjuna’s humble charioteer while retaining supreme cosmic sovereignty",
                "Engineered the ultimate restoration of Dharma while refusing to bear weapons"
            ],
            "keyPoints": [
                "Delivered the 700 verses of the Bhagavad Gita on the battlefield of Kurukshetra",
                "Served as Arjuna’s humble charioteer while retaining supreme cosmic sovereignty",
                "Engineered the ultimate restoration of Dharma while refusing to bear weapons"
            ],
            "fullDetails": [
                "God Krishna stands at the absolute center of the Mahabharata epoch. As the complete manifestation (Purna Avatar) of God Vishnu, His life effortlessly harmonizes playful pastoral joy, supreme statecraft, and uncompromising metaphysical truth.",
                "During the prelude to the Kurukshetra war, He offered Duryodhana His invincible army while choosing to stand unarmed on the Pandava side solely as Arjuna’s charioteer. By holding the reins of Arjuna's chariot, He visually demonstrated how the individual human soul must surrender its control to the Inner Divine Controller.",
                "His teachings transcend sectarian boundaries, offering humanity a universal manual for spiritual liberation, emotional resilience, selfless action, and unshakeable devotion."
            ],
            "spiritualSignificance": "The supreme speaker of the Bhagavad Gita. As Arjuna’s charioteer, He symbolizes the Inner Controller (Antaryami) guiding the human soul through the battlefield of life.",
            "gitaConnection": "The supreme speaker of the Bhagavad Gita. As Arjuna’s charioteer, He symbolizes the Inner Controller (Antaryami) guiding the human soul through the battlefield of life.",
            "keyTeaching": "Ananyas chintayanto mam ye janah paryupasate — Surrender unto Me with absolute devotion and perform your righteous duty without attachment.",
            "image": "/uploads/krishna.png"
        },
        {
            "id": "balarama",
            "name": "God Balarama",
            "sanskritName": "बलराम",
            "title": "The Master of Mace & Elder Brother",
            "faction": "DIVINE",
            "description": "Krishna's elder brother, renowned for his immense physical strength and deep affection for Duryodhana and Bhima.",
            "summary": "Krishna's elder brother, renowned for his immense physical strength and deep affection for Duryodhana and Bhima.",
            "theme": "The Master of Mace & Elder Brother",
            "highlights": [
                "Incarnation of Adi Shesha, the primordial serpent supporting the universe",
                "Master of mace warfare who trained both Duryodhana and Bhima",
                "Chose neutral pacifism during the war, embarking on a sacred pilgrimage instead"
            ],
            "keyPoints": [
                "Incarnation of Adi Shesha, the primordial serpent supporting the universe",
                "Master of mace warfare who trained both Duryodhana and Bhima",
                "Chose neutral pacifism during the war, embarking on a sacred pilgrimage instead"
            ],
            "fullDetails": [
                "God Balarama represents raw agricultural might, unyielding brotherhood, and unshakeable physical power. Armed with His divine plough and mace, He commanded immense respect across Bharatavarsha.",
                "Despite His deep bond with Krishna, Balarama harbored great affection for Duryodhana, who was His favorite student in mace combat. This emotional bias caused Him to remain neutral during the Kurukshetra war, illustrating how personal attachment can cloud absolute moral judgment.",
                "Realizing the tragic inevitability of the war, Balarama spent the conflict touring sacred rivers on a pilgrimage, returning only in time to witness the fatal mace duel between Bhima and Duryodhana."
            ],
            "spiritualSignificance": "Symbolizes physical might and moral neutrality, highlighting that raw power must be balanced with divine wisdom.",
            "gitaConnection": "Symbolizes physical might and moral neutrality, highlighting that raw power must be balanced with divine wisdom.",
            "keyTeaching": "True strength is righteous, but neutrality in the face of absolute adharma brings tragic outcomes.",
            "image": "/uploads/balarama.png"
        },

        # --- PANDAVA GROUP ---
        {
            "id": "yudhishthira",
            "name": "Yudhishthira",
            "sanskritName": "युधिष्ठिर",
            "title": "The King of Dharma",
            "faction": "PANDAVA",
            "description": "The eldest Pandava prince, known for his unyielding adherence to truth, righteousness, and justice.",
            "summary": "The eldest Pandava prince, known for his unyielding adherence to truth, righteousness, and justice.",
            "theme": "The King of Dharma",
            "highlights": [
                "Born from the grace of Yama, the God of Justice and Cosmic Law",
                "Renowned as Dharmaraja; his chariot wheels hovered above the ground due to absolute truthfulness",
                "Successfully navigated supreme moral dilemmas, exile, and the final ascent to heaven"
            ],
            "keyPoints": [
                "Born from the grace of Yama, the God of Justice and Cosmic Law",
                "Renowned as Dharmaraja; his chariot wheels hovered above the ground due to absolute truthfulness",
                "Successfully navigated supreme moral dilemmas, exile, and the final ascent to heaven"
            ],
            "fullDetails": [
                "Yudhishthira is the personification of Dharma (righteousness) under trial. As the eldest son of Pandu and Kunti, blessed by God Yama, his life was an agonizing test of whether rigid truth and justice could survive in a corrupt world.",
                "Though deeply peaceful and reluctant to fight, he was forced into a devastating war by Duryodhana's greed. His vulnerability regarding the game of dice exposed how mechanical adherence to duty without pragmatic wisdom could lead his family to ruin.",
                "Yet, his unwavering remorse, compassion for all living beings, and refusal to enter heaven without his faithful dog cemented his status as the supreme moral anchor of the epic."
            ],
            "spiritualSignificance": "Represents Sattva Guna (purity and truth). His struggles teach that righteousness must be paired with compassionate wisdom rather than rigid pride.",
            "gitaConnection": "Represents Sattva Guna (purity and truth). His struggles teach that righteousness must be paired with compassionate wisdom rather than rigid pride.",
            "keyTeaching": "Dharmo rakshati rakshitah — Dharma protects those who protect it.",
            "image": "/uploads/yudhishthira.png"
        },
        {
            "id": "arjuna",
            "name": "Arjuna",
            "sanskritName": "अर्जुन",
            "title": "The Master Archer",
            "faction": "PANDAVA",
            "description": "The peerless warrior prince of Hastinapura and recipient of the Bhagavad Gita.",
            "summary": "The peerless warrior prince of Hastinapura and recipient of the Bhagavad Gita.",
            "theme": "The Master Archer",
            "highlights": [
                "Invincible archer blessed with celestial weapons by God Shiva and Indra",
                "Sole recipient of the cosmic teachings of the Bhagavad Gita",
                "Exemplifies the ideal seeker balancing supreme martial prowess with profound spiritual humility"
            ],
            "keyPoints": [
                "Invincible archer blessed with celestial weapons by God Shiva and Indra",
                "Sole recipient of the cosmic teachings of the Bhagavad Gita",
                "Exemplifies the ideal seeker balancing supreme martial prowess with profound spiritual humility"
            ],
            "fullDetails": [
                "Arjuna was the third Pandava, born of Kunti and God Indra. Peerless in archery and intensely devoted to his craft, he mastered the Gandiva bow and earned the title Dhananjaya (conqueror of wealth and glory).",
                "Despite his legendary heroism, Arjuna suffered a catastrophic emotional collapse on the battlefield of Kurukshetra when he saw his revered teachers, cousins, and friends arrayed against him. His grief paralyzed his limbs and blinded his judgment.",
                "His surrender to God Krishna converted his battlefield despair into immortal spiritual awakening, transforming him from a conflicted warrior into an instrument of divine cosmic order."
            ],
            "spiritualSignificance": "The archetypal human seeker caught in moral dilemma and emotional grief, whose surrender to Krishna prompts the revelation of the Gita.",
            "gitaConnection": "The archetypal human seeker caught in moral dilemma and emotional grief, whose surrender to Krishna prompts the revelation of the Gita.",
            "keyTeaching": "Kshudram hridaya-daurbalyam tyaktvottishtha parantapa — Cast off this petty weakness of heart and rise.",
            "image": "/uploads/arjuna.png"
        },
        {
            "id": "bhima",
            "name": "Bhima",
            "sanskritName": "भीम",
            "title": "The Wolf-Belly Mighty Hero",
            "faction": "PANDAVA",
            "description": "The immensely powerful second Pandava, feared by enemies for his unmatched strength with the mace.",
            "summary": "The immensely powerful second Pandava, feared by enemies for his unmatched strength with the mace.",
            "theme": "The Wolf-Belly Mighty Hero",
            "highlights": [
                "Born from the grace of Vayu, the Wind God, granting him the strength of ten thousand elephants",
                "Vanquished legendary demons like Bakasur, Hidimba, and Kichaka",
                "Fierce protector of his family, fulfilling his solemn vows by vanquishing all Kaurava oppressors"
            ],
            "keyPoints": [
                "Born from the grace of Vayu, the Wind God, granting him the strength of ten thousand elephants",
                "Vanquished legendary demons like Bakasur, Hidimba, and Kichaka",
                "Fierce protector of his family, fulfilling his solemn vows by vanquishing all Kaurava oppressors"
            ],
            "fullDetails": [
                "Bhima represents dynamic life-force, unyielding protection, and absolute fearlessness. Blessed with the colossal might of Vayu, he was the physical shield of the Pandavas against countless assassination attempts.",
                "Beneath his formidable exterior and fierce temper lay a deeply tender heart devoted entirely to his mother Kunti and brothers. However, when faced with adharma, his wrath was absolute and uncompromised.",
                "His fulfillment of vows—crushing Duryodhana’s thigh and striking down Dushasana—restored justice, though it also highlighted the brutal, unavoidable realities of war."
            ],
            "spiritualSignificance": "Embodies life-force (Prana) and dynamic action (Karma Yoga), demonstrating fierce protection of righteousness.",
            "gitaConnection": "Embodies life-force (Prana) and dynamic action (Karma Yoga), demonstrating fierce protection of righteousness.",
            "keyTeaching": "Righteous action requires unwavering execution and fearless confrontation of adharma.",
            "image": "/uploads/bhima.png"
        },
        {
            "id": "nakula",
            "name": "Nakula",
            "sanskritName": "नकुल",
            "title": "The Master Swordsman & Equine Expert",
            "faction": "PANDAVA",
            "description": "The fourth Pandava, celebrated for his exceptional grace, handsome features, and mastery over horses.",
            "summary": "The fourth Pandava, celebrated for his exceptional grace, handsome features, and mastery over horses.",
            "theme": "The Master Swordsman & Equine Expert",
            "highlights": [
                "Born from the Ashwini Kumars, the celestial physicians and horsemen",
                "Renowned as the most handsome man in the entire world",
                "Expert military strategist, swordsman, and supreme caretaker of royal cavalry"
            ],
            "keyPoints": [
                "Born from the Ashwini Kumars, the celestial physicians and horsemen",
                "Renowned as the most handsome man in the entire world",
                "Expert military strategist, swordsman, and supreme caretaker of royal cavalry"
            ],
            "fullDetails": [
                "Nakula, twin brother of Sahadeva, was born to Queen Madri through the blessings of the Ashwini Kumars. Blessed with exquisite grace and profound wisdom regarding equine sciences, he managed the massive cavalry forces of the Pandava army.",
                "Though quieter in the epic narrative than Yudhishthira or Arjuna, Nakula’s loyalty, courage, and nobility were absolute. During the exile in Kamyaka forest, his steadfast endurance under extreme hardship showcased his inner fortitude.",
                "He survived the Kurukshetra war and lived to witness the dawn of a righteous era under Yudhishthira’s imperial rule."
            ],
            "spiritualSignificance": "Represents mastery over the senses (the horses of the body-chariot metaphor in Vedic texts).",
            "gitaConnection": "Represents mastery over the senses (the horses of the body-chariot metaphor in Vedic texts).",
            "keyTeaching": "Grace and physical mastery must be anchored in deep spiritual loyalty to righteousness.",
            "image": "/uploads/nakula.png"
        },
        {
            "id": "sahadeva",
            "name": "Sahadeva",
            "sanskritName": "सहदेव",
            "title": "The Wise Astrologer",
            "faction": "PANDAVA",
            "description": "The youngest Pandava, renowned for his profound wisdom, foresight, and mastery of astrology.",
            "summary": "The youngest Pandava, renowned for his profound wisdom, foresight, and mastery of astrology.",
            "theme": "The Wise Astrologer",
            "highlights": [
                "Possessed divine astrological foresight, knowing the outcome of the war beforehand",
                "Bound by a cosmic curse that he would die if he revealed secrets of the future uninvited",
                "Celebrated for his unmatched humility, silence, and deep devotion to God Krishna"
            ],
            "keyPoints": [
                "Possessed divine astrological foresight, knowing the outcome of the war beforehand",
                "Bound by a cosmic curse that he would die if he revealed secrets of the future uninvited",
                "Celebrated for his unmatched humility, silence, and deep devotion to God Krishna"
            ],
            "fullDetails": [
                "Sahadeva, the youngest twin born to Madri, possessed an intellect that spanned past, present, and future. Blessed with prophetic vision, he understood every strategic outcome of the Mahabharata war before it even commenced.",
                "Despite knowing the immense tragedy ahead, he maintained a solemn silence due to cosmic laws, channeling his wisdom into quiet service, humility, and unwavering support for his eldest brother Yudhishthira.",
                "His character symbolizes silent wisdom—the understanding that intellectual foresight must culminate in selfless surrender to the divine will."
            ],
            "spiritualSignificance": "Embodies humility, inner vision, and silent surrender to the cosmic flow of destiny.",
            "gitaConnection": "Embodies humility, inner vision, and silent surrender to the cosmic flow of destiny.",
            "keyTeaching": "True wisdom expresses itself not in pride, but in quiet humility and devotion.",
            "image": "/uploads/sahadeva.png"
        },
        {
            "id": "draupadi",
            "name": "Draupadi",
            "sanskritName": "द्रौपदी",
            "title": "Empress of Hastinapura",
            "faction": "PANDAVA",
            "description": "The fiery and virtuous queen whose honor catalyzed the great war of Kurukshetra.",
            "summary": "The fiery and virtuous queen whose honor catalyzed the great war of Kurukshetra.",
            "theme": "Empress of Hastinapura",
            "highlights": [
                "Miraculously born from a sacred fire altar in the kingdom of Panchala",
                "Endured supreme humiliation in the royal court, transforming her grief into an unyielding call for justice",
                "Exemplifies fierce queenly dignity, absolute faith in Krishna, and uncompromised resolve"
            ],
            "keyPoints": [
                "Miraculously born from a sacred fire altar in the kingdom of Panchala",
                "Endured supreme humiliation in the royal court, transforming her grief into an unyielding call for justice",
                "Exemplifies fierce queenly dignity, absolute faith in Krishna, and uncompromised resolve"
            ],
            "fullDetails": [
                "Draupadi, also known as Panchali, was no ordinary mortal woman; she emerged fully grown from a sacred sacrificial fire alongside her twin brother Dhrishtadyumna, destined to alter the course of history.",
                "As the shared queen of the five Pandavas, she embodied grace, sharp intellect, and fierce righteousness. Her public humiliation in the assembly hall of Hastinapura became the moral tipping point of the epoch, exposing the total collapse of Kuru ethics.",
                "Her unbroken cry to God Krishna during her disrobing is legendary, demonstrating how absolute surrender in moments of helplessness invokes immediate divine intervention."
            ],
            "spiritualSignificance": "Symbolizes unyielding soul-force and absolute faith in divine intervention during moments of utter helplessness.",
            "gitaConnection": "Symbolizes unyielding soul-force and absolute faith in divine intervention during moments of utter helplessness.",
            "keyTeaching": "Dignity and righteousness cannot be crushed by tyranny; divine justice ultimately prevails.",
            "image": "/uploads/draupadi.png"
        },
        {
            "id": "subhadra",
            "name": "Subhadra",
            "sanskritName": "सुभद्रा",
            "title": "Princess of Dwarka",
            "faction": "PANDAVA",
            "description": "Krishna’s sister, Arjuna's wife, and the mother of the fearless hero Abhimanyu.",
            "summary": "Krishna’s sister, Arjuna's wife, and the mother of the fearless hero Abhimanyu.",
            "theme": "Princess of Dwarka",
            "highlights": [
                "Beloved sister of God Krishna and God Balarama",
                "Heard the secrets of the Chakravyuha while in the womb, imparting resilience to her son Abhimanyu",
                "Embodying familial grace, feminine fortitude, and steadfast devotion"
            ],
            "keyPoints": [
                "Beloved sister of God Krishna and God Balarama",
                "Heard the secrets of the Chakravyuha while in the womb, imparting resilience to her son Abhimanyu",
                "Embodying familial grace, feminine fortitude, and steadfast devotion"
            ],
            "fullDetails": [
                "Subhadra was the cherished princess of the Vrishni dynasty. Her marriage to Arjuna bridged the Yadava and Kuru dynasties, creating a powerful political and spiritual alliance.",
                "While pregnant with Abhimanyu, she listened intently as Arjuna described the military formations of war, specifically the Chakravyuha. Though she fell asleep before hearing the exit strategy, her unborn child absorbed the tactical knowledge.",
                "She later emerged as a pillar of emotional strength during the tragic loss of her son Abhimanyu and husband Arjuna, maintaining grace through generations of trial."
            ],
            "spiritualSignificance": "Represents devotion and familial harmony bridging divine grace with human duty.",
            "gitaConnection": "Represents devotion and familial harmony bridging divine grace with human duty.",
            "keyTeaching": "Feminine grace and steadfast devotion form the emotional bedrock of righteous civilizations.",
            "image": "/uploads/subhadra.png"
        },
        {
            "id": "abhimanyu",
            "name": "Abhimanyu",
            "sanskritName": "अभिमन्यु",
            "title": "The Fearless Hero",
            "faction": "PANDAVA",
            "description": "Arjuna and Subhadra's valiant son who heroically breached the deadly Chakravyuha formation.",
            "summary": "Arjuna and Subhadra's valiant son who heroically breached the deadly Chakravyuha formation.",
            "theme": "The Fearless Hero",
            "highlights": [
                "Peerless teenage warrior who single-handedly shattered the Kaurava battle formation",
                "Fought like a lion against veteran generals when trapped behind enemy lines",
                "Immortalized as the epitome of supreme valor, sacrifice, and fearlessness"
            ],
            "keyPoints": [
                "Peerless teenage warrior who single-handedly shattered the Kaurava battle formation",
                "Fought like a lion against veteran generals when trapped behind enemy lines",
                "Immortalized as the epitome of supreme valor, sacrifice, and fearlessness"
            ],
            "fullDetails": [
                "Abhimanyu was the darling of the Pandava camp—a youth of breathtaking beauty, unmatched archery skill, and fearless courage. Raised in Dwarka under Krishna’s watchful care, he embodied the finest warrior ideals.",
                "On the thirteenth day of war, when the Kauravas trapped the Pandava army using the complex Chakravyuha, Abhimanyu courageously volunteered to lead the charge, knowing how to enter but not how to exit.",
                "Trapped inside, he fought an entire army of veteran commanders single-handedly until his chariot was destroyed, fighting on with a broken wheel before falling a martyr at a tender age."
            ],
            "spiritualSignificance": "Exemplifies fearlessness and complete dedication to duty without calculating personal survival.",
            "gitaConnection": "Exemplifies fearlessness and complete dedication to duty without calculating personal survival.",
            "keyTeaching": "True heroism lies in standing fearless against insurmountable odds for the sake of righteousness.",
            "image": "/uploads/abhimanyu.png"
        },
        {
            "id": "ghatotkacha",
            "name": "Ghatotkacha",
            "sanskritName": "घटोत्कच",
            "title": "The Mighty Rakshasa Warrior",
            "faction": "PANDAVA",
            "description": "The valiant half-demon son of Bhima and Hidimba, whose sacrifice turned the tide of the night battle.",
            "summary": "The valiant half-demon son of Bhima and Hidimba, whose sacrifice turned the tide of the night battle.",
            "theme": "The Mighty Rakshasa Warrior",
            "highlights": [
                "Possessed terrifying magical powers, colossal size, and absolute loyalty to the Pandavas",
                "Terrorized the Kaurava army during the pitch-black night engagement",
                "Sacrificed his life by forcing Karna to spend his infallible divine weapon (Vasavi Shakti)"
            ],
            "keyPoints": [
                "Possessed terrifying magical powers, colossal size, and absolute loyalty to the Pandavas",
                "Terrorized the Kaurava army during the pitch-black night engagement",
                "Sacrificed his life by forcing Karna to spend his infallible divine weapon (Vasavi Shakti)"
            ],
            "fullDetails": [
                "Ghatotkacha, born of Bhima and the forest queen Hidimba, was a towering warrior whose mystical Rakshasa abilities made him a formidable asset during nocturnal warfare.",
                "Though born of a demon lineage, his heart was entirely devoted to his father Bhima and the Pandava cause. He answered Yudhishthira’s call instantly whenever his terrifying combat skills were required.",
                "His crowning sacrifice occurred when Duryodhana forced Karna to unleash the divine spear given by Indra. Ghatotkacha expanded his body to monumental proportions as he fell, crushing thousands of enemy soldiers and saving Arjuna's life."
            ],
            "spiritualSignificance": "Demonstrates selfless sacrifice (Yajna) for the greater protection of the righteous.",
            "gitaConnection": "Demonstrates selfless sacrifice (Yajna) for the greater protection of the righteous.",
            "keyTeaching": "Ultimate sacrifice for the protection of righteousness immortalizes a soul across history.",
            "image": "/uploads/ghatotkacha.png"
        },
        {
            "id": "kunti",
            "name": "Queen Kunti",
            "sanskritName": "माता कुंती",
            "title": "Mother of Heroes",
            "faction": "PANDAVA",
            "description": "A queen of immense resilience, grace, and maternal fortitude, holding a deep past secret regarding Karna.",
            "summary": "A queen of immense resilience, grace, and maternal fortitude, holding a deep past secret regarding Karna.",
            "theme": "Mother of Heroes",
            "highlights": [
                "Gifted with a sacred mantra by sage Durvasa allowing her to invoke deities",
                "Raised her five fatherless sons through agonizing trials in exile and court",
                "Exemplifies supreme maternal sacrifice and unshakeable inner resilience"
            ],
            "keyPoints": [
                "Gifted with a sacred mantra by sage Durvasa allowing her to invoke deities",
                "Raised her five fatherless sons through agonizing trials in exile and court",
                "Exemplifies supreme maternal sacrifice and unshakeable inner resilience"
            ],
            "fullDetails": [
                "Queen Kunti, born Pritha, was the adoptive daughter of Kuntibhoja. As a young maiden, she tested a sacred boon granted by sage Durvasa, invoking the Sun God Surya, which resulted in the birth of her firstborn son, Karna, whom she tearfully set adrift in the river.",
                "Later marrying King Pandu, she became the mother of the three elder Pandavas and raised Madri’s twins as her own. Her life was an unyielding testament to suffering borne with royal dignity.",
                "Her parting words to Krishna before the war—asking Him to remind Yudhishthira of a queen's duty to fight—reveal her as a master strategist of righteous duty."
            ],
            "spiritualSignificance": "Her famous prayer to Krishna asks for adversities rather than comforts, because hardships keep the mind fixed on the Divine.",
            "gitaConnection": "Her famous prayer to Krishna asks for adversities rather than comforts, because hardships keep the mind fixed on the Divine.",
            "keyTeaching": "Adversities are blessings in disguise because they keep the human mind anchored in God.",
            "image": "/uploads/kunti.png"
        },
        {
            "id": "madri",
            "name": "Queen Madri",
            "sanskritName": "माद्री",
            "title": "Mother of Nakula and Sahadeva",
            "faction": "PANDAVA",
            "description": "The graceful princess of Madra and second wife of King Pandu.",
            "summary": "The graceful princess of Madra and second wife of King Pandu.",
            "theme": "Mother of Nakula and Sahadeva",
            "highlights": [
                "Princess of Madra whose marriage forged a strategic Kuru alliance",
                "Mother of the divine twin princes Nakula and Sahadeva",
                "Chose self-immolation out of profound grief and moral responsibility for Pandu's death"
            ],
            "keyPoints": [
                "Princess of Madra whose marriage forged a strategic Kuru alliance",
                "Mother of the divine twin princes Nakula and Sahadeva",
                "Chose self-immolation out of profound grief and moral responsibility for Pandu's death"
            ],
            "fullDetails": [
                "Queen Madri was brought to Hastinapura as part of Bhishma’s marital diplomacy. Gentle, modest, and fiercely devoted, she shared a poignant bond with co-queen Kunti during their years in the forest.",
                "Her life was cut short by tragedy when King Pandu succumbed to the fatal curse of the mating deer. Overwhelmed with remorse, Madri chose to ascend Pandu’s funeral pyre, entrusting her twin sons entirely to Kunti's care.",
                "Her sacrifice remains one of the most heart-wrenching demonstrations of wifely devotion and accountability in Vedic history."
            ],
            "spiritualSignificance": "Reflects ultimate devotion, accountability, and the tragic fragility of mortal existence.",
            "gitaConnection": "Reflects ultimate devotion, accountability, and the tragic fragility of mortal existence.",
            "keyTeaching": "True love and loyalty transcend physical boundaries, embracing ultimate sacrifice.",
            "image": "/uploads/madri.png"
        },
        {
            "id": "pandu",
            "name": "King Pandu",
            "sanskritName": "पाण्डु",
            "title": "The Pale Monarch of Kurus",
            "faction": "PANDAVA",
            "description": "Father of the five Pandavas, cursed to a tragic fate that led him to abdicate his throne to the forest.",
            "summary": "Father of the five Pandavas, cursed to a tragic fate that led him to abdicate his throne to the forest.",
            "theme": "The Pale Monarch of Kurus",
            "highlights": [
                "Fearless conqueror who expanded the Kuru empire across Bharatavarsha",
                "Struck by a tragic hunting curse that ended his royal ambitions",
                "Spent his final years seeking redemption as an ascetic sage in the Himalayas"
            ],
            "keyPoints": [
                "Fearless conqueror who expanded the Kuru empire across Bharatavarsha",
                "Struck by a tragic hunting curse that ended his royal ambitions",
                "Spent his final years seeking redemption as an ascetic sage in the Himalayas"
            ],
            "fullDetails": [
                "King Pandu was renowned for his pale complexion, immaculate archery, and righteous governance. Under his leadership, Hastinapura reached new heights of military security and economic prosperity.",
                "His life changed forever when he accidentally shot a sage disguised as a mating deer, receiving a fatal curse that he would die if he ever embraced his wives. Wracked with guilt, he immediately surrendered his crown to his blind brother Dhritarashtra and retreated into forest asceticism.",
                "Though he could not father children biologically, his acceptance of Kunti’s divine mantra blessed the world with the five Pandava heroes before his tragic demise."
            ],
            "spiritualSignificance": "Symbolizes detachment from royal power and the search for spiritual redemption in nature.",
            "gitaConnection": "Symbolizes detachment from royal power and the search for spiritual redemption in nature.",
            "keyTeaching": "Detachment from worldly power opens the path toward deeper spiritual awakening.",
            "image": "/uploads/pandu.png"
        },
        {
            "id": "vidura",
            "name": "Mahamatra Vidura",
            "sanskritName": "महामात्र विदुर",
            "title": "The Wise Counselor",
            "faction": "PANDAVA",
            "description": "Renowned for his infallible righteousness, wisdom, statesmanship, and devotion to God Krishna.",
            "summary": "Renowned for his infallible righteousness, wisdom, statesmanship, and devotion to God Krishna.",
            "theme": "The Wise Counselor",
            "highlights": [
                "Incarnation of Yama, born of a maidservant due to a sage's curse",
                "Prime minister of Hastinapura who continuously spoke truth to royal power",
                "Author of 'Vidura Niti', an immortal treatise on ethics, governance, and spiritual wisdom"
            ],
            "keyPoints": [
                "Incarnation of Yama, born of a maidservant due to a sage's curse",
                "Prime minister of Hastinapura who continuously spoke truth to royal power",
                "Author of 'Vidura Niti', an immortal treatise on ethics, governance, and spiritual wisdom"
            ],
            "fullDetails": [
                "Mahamatra Vidura was the moral conscience of the Kuru empire. Though marginalized by birth due to his mother's status, his towering intellect and uncorrupted integrity earned him the highest ministerial seat in Hastinapura.",
                "He repeatedly risked his life warning Dhritarashtra against Duryodhana’s wicked schemes, urging the king to embrace peace and justice. When his counsel was repeatedly rejected, he voluntarily renounced his position and embarked on a pilgrimage.",
                "His recorded dialogues with King Dhritarashtra, known as Vidura Niti, remain foundational masterpieces of ancient Hindu political science and ethics."
            ],
            "spiritualSignificance": "Embodies Jnana (spiritual wisdom) and fearless adherence to truth regardless of political consequences.",
            "gitaConnection": "Embodies Jnana (spiritual wisdom) and fearless adherence to truth regardless of political consequences.",
            "keyTeaching": "Speak truth fearlessly to power, for compromise with adharma ensures collective ruin.",
            "image": "/uploads/vidura.png"
        },
        {
            "id": "drupada",
            "name": "King Drupada",
            "sanskritName": "द्रुपद",
            "title": "Monarch of Panchala",
            "faction": "PANDAVA",
            "description": "The proud king of Panchala and father of Draupadi and Shikhandi, seeking vengeance against Dronacharya.",
            "summary": "The proud king of Panchala and father of Draupadi and Shikhandi, seeking vengeance against Dronacharya.",
            "theme": "Monarch of Panchala",
            "highlights": [
                "Childhood friend turned bitter enemy of Acharya Drona",
                "Conducted a powerful fire sacrifice to obtain children destined to vanquish Drona",
                "Forged the ultimate political alliance with the Pandavas through Draupadi's marriage"
            ],
            "keyPoints": [
                "Childhood friend turned bitter enemy of Acharya Drona",
                "Conducted a powerful fire sacrifice to obtain children destined to vanquish Drona",
                "Forged the ultimate political alliance with the Pandavas through Draupadi's marriage"
            ],
            "fullDetails": [
                "King Drupada of Panchala was a proud and ambitious monarch whose youthful arrogance led to a humiliating defeat at the hands of his former classmate, Dronacharya, who seized half his kingdom.",
                "Consumed by a burning desire for revenge, Drupada performed severe austerities and fire sacrifices to obtain a son who could kill Drona and a daughter who would alter royal history.",
                "His ambitions were ultimately realized when his children Dhrishtadyumna and Draupadi fulfilled their destinies, bridging Panchala and the Pandavas into an unstoppable military alliance."
            ],
            "spiritualSignificance": "Highlights how ego and unfulfilled vengeance can entangle souls in worldly conflicts.",
            "gitaConnection": "Highlights how ego and unfulfilled vengeance can entangle souls in worldly conflicts.",
            "keyTeaching": "Holding onto bitter grievances breeds cycles of conflict that consume generations.",
            "image": "/uploads/drupada.png"
        },
        {
            "id": "shikhandi",
            "name": "Shikhandi",
            "sanskritName": "शिखंडी",
            "title": "The Warrior of Destiny",
            "faction": "PANDAVA",
            "description": "King Drupada's child whose unique destiny played a pivotal role in the downfall of Grandfather Bhishma.",
            "summary": "King Drupada's child whose unique destiny played a pivotal role in the downfall of Grandfather Bhishma.",
            "theme": "The Warrior of Destiny",
            "highlights": [
                "Reincarnation of Princess Amba, born specifically to exact vengeance upon Bhishma",
                "Underwent a miraculous gender transformation to fulfill a cosmic vow",
                "Stood before Bhishma on the battlefield, neutralizing the invincible grandsire"
            ],
            "keyPoints": [
                "Reincarnation of Princess Amba, born specifically to exact vengeance upon Bhishma",
                "Underwent a miraculous gender transformation to fulfill a cosmic vow",
                "Stood before Bhishma on the battlefield, neutralizing the invincible grandsire"
            ],
            "fullDetails": [
                "Shikhandi’s life was bound to an ancient curse from a previous lifetime as Princess Amba, who had been rejected by Bhishma and vowed to destroy him in her next birth.",
                "Raised as a prince of Panchala and trained rigorously in warfare, Shikhandi possessed the unique karmic clearance required to face Bhishma, who had sworn never to raise weapons against a woman or someone born female.",
                "On the tenth day of Kurukshetra, shielding behind Arjuna, Shikhandi became the living instrument of Bhishma’s downfall, fulfilling an ancient cosmic destiny."
            ],
            "spiritualSignificance": "Illustrates how past-life karma and cosmic destiny inexorably shape present outcomes.",
            "gitaConnection": "Illustrates how past-life karma and cosmic destiny inexorably shape present outcomes.",
            "keyTeaching": "Cosmic justice operates across lifetimes, ensuring that every vow finds its fulfillment.",
            "image": "/uploads/shikhandi.png"
        },

        # --- KAURAVA GROUP ---
        {
            "id": "duryodhana",
            "name": "Duryodhana",
            "sanskritName": "दुर्योधन",
            "title": "The Crown Prince of Hastinapura",
            "faction": "KAURAVA",
            "description": "The proud, ambitious, and unyielding leader of the Kauravas, driven by a deep rivalry with the Pandavas.",
            "summary": "The proud, ambitious, and unyielding leader of the Kauravas, driven by a deep rivalry with the Pandavas.",
            "theme": "The Crown Prince of Hastinapura",
            "highlights": [
                "Eldest son of Dhritarashtra and Gandhari, endowed with a body of hardened diamond",
                "Master of mace combat trained alongside Balarama",
                "Refused to surrender even a needlepoint of land without war, embodying supreme ego"
            ],
            "keyPoints": [
                "Eldest son of Dhritarashtra and Gandhari, endowed with a body of hardened diamond",
                "Master of mace combat trained alongside Balarama",
                "Refused to surrender even a needlepoint of land without war, embodying supreme ego"
            ],
            "fullDetails": [
                "Duryodhana, whose birth name was Suodhana ('hard to conquer'), was the tragic embodiment of unchecked ambition, jealousy, and ego. From childhood, he viewed the Pandavas as existential threats to his crown.",
                "Despite his numerous tyrannical acts—including the Lakshagriha arson plot, the rigged dice game, and the public abuse of Draupadi—he possessed undeniable loyalty toward his allies like Karna and immense personal courage.",
                "His final stand in the mace duel against Bhima showcased a fierce, unbroken pride, dying unrepentant on the battlefield of Kurukshetra."
            ],
            "spiritualSignificance": "The classic embodiment of Ahankara (ego), greed, and Asuric (demonic) qualities described in Chapter 16 of the Gita.",
            "gitaConnection": "The classic embodiment of Ahankara (ego), greed, and Asuric (demonic) qualities described in Chapter 16 of the Gita.",
            "keyTeaching": "Unchecked ego, jealousy, and entitlement inevitably lead self and kingdom to absolute ruin.",
            "image": "/uploads/duryodhana.png"
        },
        {
            "id": "dushasana",
            "name": "Dushasana",
            "sanskritName": "दुशासन",
            "title": "The Fierce Kaurava Prince",
            "faction": "KAURAVA",
            "description": "Duryodhana's loyal and aggressive younger brother, heavily implicated in the disrobing of Draupadi.",
            "summary": "Duryodhana's loyal and aggressive younger brother, heavily implicated in the disrobing of Draupadi.",
            "theme": "The Fierce Kaurava Prince",
            "highlights": [
                "Duryodhana’s primary enforcer in executing brutal political plots",
                "Infamously dragged Queen Draupadi by her hair into the royal assembly",
                "Met a gruesome fate on the battlefield at the hands of an enraged Bhima"
            ],
            "keyPoints": [
                "Duryodhana’s primary enforcer in executing brutal political plots",
                "Infamously dragged Queen Draupadi by her hair into the royal assembly",
                "Met a gruesome fate on the battlefield at the hands of an enraged Bhima"
            ],
            "fullDetails": [
                "Dushasana was the fiercely loyal shadow of his elder brother Duryodhana, executing every vicious mandate without moral hesitation. His aggression fueled the escalating hostility between the cousins.",
                "His most infamous act was dragging Draupadi into the royal court during the dice game and attempting to disrobe her. This brutal violation crossed the ultimate ethical boundary of civilization.",
                "His death on the battlefield, fulfilling Bhima’s horrific vow, remains one of the most chilling illustrations of retributive justice in the epic."
            ],
            "spiritualSignificance": "Represents blind attachment to adharmic authority and unchecked anger (Krodha).",
            "gitaConnection": "Represents blind attachment to adharmic authority and unchecked anger (Krodha).",
            "keyTeaching": "Blind obedience to tyrannical authority makes one an accomplice to ultimate evil.",
            "image": "/uploads/dushasana.png"
        },
        {
            "id": "karna",
            "name": "Karna",
            "sanskritName": "कर्ण",
            "title": "The Generous Warrior",
            "faction": "KAURAVA",
            "description": "A legendary warrior of unmatched generosity, born of Kunti and Surya, standing loyal to Duryodhana.",
            "summary": "A legendary warrior of unmatched generosity, born of Kunti and Surya, standing loyal to Duryodhana.",
            "theme": "The Generous Warrior",
            "highlights": [
                "Born with divine armor (Kavacha) and earrings (Kundala) that made him invincible",
                "Renowned globally as 'Danashreshtha' (the greatest philanthropist who never turned away a beggar)",
                "Tragically caught between maternal abandonment, loyalty to adharma, and a cursed destiny"
            ],
            "keyPoints": [
                "Born with divine armor (Kavacha) and earrings (Kundala) that made him invincible",
                "Renowned globally as 'Danashreshtha' (the greatest philanthropist who never turned away a beggar)",
                "Tragically caught between maternal abandonment, loyalty to adharma, and a cursed destiny"
            ],
            "fullDetails": [
                "Karna’s life is one of the most poignant tragedies in world literature. Abandoned at birth by Kunti, raised by charioteer foster parents, and mocked for his low caste, he endured relentless humiliation until Duryodhana embraced him as an equal.",
                "Because Duryodhana gave him royal status and friendship when no one else would, Karna pledged his life to him, even after discovering the Pandavas were his biological brothers.",
                "His generosity was legendary: when Indra disguised himself as a beggar to strip away Karna’s divine armor, Karna cut it from his own skin without hesitation, earning the eternal admiration of the Gods."
            ],
            "spiritualSignificance": "A tragic study in misplaced loyalty; despite his charity, his association with adharma led to his downfall, illustrating how company dictates destiny.",
            "gitaConnection": "A tragic study in misplaced loyalty; despite his charity, his association with adharma led to his downfall, illustrating how company dictates destiny.",
            "keyTeaching": "Generosity and talent, when yoked to adharma and misplaced loyalty, lead to tragic ruin.",
            "image": "/uploads/karna.png"
        },
        {
            "id": "shakuni",
            "name": "Shakuni",
            "sanskritName": "शकुनि",
            "title": "The Master Strategist of Gandhara",
            "faction": "KAURAVA",
            "description": "Duryodhana's cunning maternal uncle whose master plans and loaded dice fueled the Kuru conflict.",
            "summary": "Duryodhana's cunning maternal uncle whose master plans and loaded dice fueled the Kuru conflict.",
            "theme": "The Master Strategist of Gandhara",
            "highlights": [
                "Prince of Gandhara who vowed to destroy the Kuru dynasty from within",
                "Master of sorcery and loaded dice crafted from his deceased father's magical spinal bones",
                "The architectural mastermind behind the exile of the Pandavas"
            ],
            "keyPoints": [
                "Prince of Gandhara who vowed to destroy the Kuru dynasty from within",
                "Master of sorcery and loaded dice crafted from his deceased father's magical spinal bones",
                "The architectural mastermind behind the exile of the Pandavas"
            ],
            "fullDetails": [
                "Shakuni was driven by a burning thirst for vengeance after Bhishma forced Gandhara into a political alliance with Hastinapura, causing his family immense suffering. He vowed to systematically dismantle the Kuru dynasty from the inside.",
                "Using his brilliant intellect, unmatched manipulation, and enchanted dice, he controlled his nephew Duryodhana like a puppet, orchestrating every major political crisis leading to the war.",
                "He remained unrepentant until his final breath on the battlefield, where he was defeated and slain by Sahadeva."
            ],
            "spiritualSignificance": "Embodies cunning intellect (Durmati) driven by malice rather than spiritual alignment.",
            "gitaConnection": "Embodies cunning intellect (Durmati) driven by malice rather than spiritual alignment.",
            "keyTeaching": "Cunning manipulation and deep-seated vengeance corrode society from within.",
            "image": "/uploads/shakuni.png"
        },
        {
            "id": "dhritarashtra",
            "name": "King Dhritarashtra",
            "sanskritName": "धृतराष्ट्र",
            "title": "The Blind Sovereign of Hastinapura",
            "faction": "KAURAVA",
            "description": "The blind king whose deep attachment and blinding affection for his sons led the kingdom to ruin.",
            "summary": "The blind king whose deep attachment and blinding affection for his sons led the kingdom to ruin.",
            "theme": "The Blind Sovereign of Hastinapura",
            "highlights": [
                "Born blind, denied the throne initially due to his physical disability",
                "Possessed the physical strength of ten thousand elephants in his embrace",
                "Paralyzed by obsessive parental affection, enabling every crime committed by Duryodhana"
            ],
            "keyPoints": [
                "Born blind, denied the throne initially due to his physical disability",
                "Possessed the physical strength of ten thousand elephants in his embrace",
                "Paralyzed by obsessive parental affection, enabling every crime committed by Duryodhana"
            ],
            "fullDetails": [
                "King Dhritarashtra ruled Hastinapura through proxy for decades. Though he was frequently counseled by wise ministers like Vidura and Sanjaya, his blinding parental attachment (Moh) rendered him morally impotent.",
                "Whenever Duryodhana crossed ethical lines, Dhritarashtra's synthetic grief and secret approval allowed the atrocities to continue. He consistently chose familial nepotism over cosmic righteousness.",
                "After losing all his sons in the war, he spent his final years in forest penance alongside Gandhari, perishing in a Himalayan forest fire."
            ],
            "spiritualSignificance": "Represents physical and psychological blindness caused by excessive attachment (Sanga) and familial bias.",
            "gitaConnection": "Represents physical and psychological blindness caused by excessive attachment (Sanga) and familial bias.",
            "keyTeaching": "Blind parental affection and attachment to power destroy families and kingdoms alike.",
            "image": "/uploads/dhritarashtra.png"
        },
        {
            "id": "gandhari",
            "name": "Queen Gandhari",
            "sanskritName": "गांधारी",
            "title": "The Devoted Blindfolded Queen",
            "faction": "KAURAVA",
            "description": "A virtuous queen who chose to blindfold herself for life out of solidarity with her blind husband.",
            "summary": "A virtuous queen who chose to blindfold herself for life out of solidarity with her blind husband.",
            "theme": "The Devoted Blindfolded Queen",
            "highlights": [
                "Princess of Gandhara who selflessly bound her eyes with silk for decades",
                "Possessed immense spiritual power through her chastity and tapasya",
                "Imbued Duryodhana’s body with invulnerability through a single glance of focused energy"
            ],
            "keyPoints": [
                "Princess of Gandhara who selflessly bound her eyes with silk for decades",
                "Possessed immense spiritual power through her chastity and tapasya",
                "Imbued Duryodhana’s body with invulnerability through a single glance of focused energy"
            ],
            "fullDetails": [
                "Queen Gandhari was an embodiment of supreme wifely devotion and austere self-sacrifice. Upon learning she was married to a blind king, she wrapped a silk cloth over her eyes, refusing to experience a visual world her husband could not see.",
                "Though deeply virtuous, her supreme mistake was failing to correct her children, blinded by maternal grief and submission to her husband's weakness.",
                "Following the catastrophic slaughter of her sons, her grief reached such cosmic proportions that she cursed God Krishna, predicting the eventual destruction of the Yadava dynasty."
            ],
            "spiritualSignificance": "Exemplifies supreme sacrifice, yet her story highlights how righteousness must be active rather than passive.",
            "gitaConnection": "Exemplifies supreme sacrifice, yet her story highlights how righteousness must be active rather than passive.",
            "keyTeaching": "Sacrifice and devotion must be guided by active moral clarity rather than passive submission.",
            "image": "/uploads/gandhari.png"
        },
        {
            "id": "bhishma",
            "name": "Bhishma Pitamah",
            "sanskritName": "भीष्म पितामह",
            "title": "The Grand Patriarch",
            "faction": "KAURAVA",
            "description": "The invincible grandsire of the Kuru dynasty, bound by a lifelong vow of celibacy and duty to the throne.",
            "summary": "The invincible grandsire of the Kuru dynasty, bound by a lifelong vow of celibacy and duty to the throne.",
            "theme": "The Grand Patriarch",
            "highlights": [
                "Son of King Shantanu and Goddess Ganga, blessed with 'Ichcha Mrityu' (death by choice)",
                "Took the terrifying 'Bhishma Pratigya' vow of lifelong celibacy to secure his father's happiness",
                "Commander-in-chief of the Kaurava armies, virtually invincible in battle"
            ],
            "keyPoints": [
                "Son of King Shantanu and Goddess Ganga, blessed with 'Ichcha Mrityu' (death by choice)",
                "Took the terrifying 'Bhishma Pratigya' vow of lifelong celibacy to secure his father's happiness",
                "Commander-in-chief of the Kaurava armies, virtually invincible in battle"
            ],
            "fullDetails": [
                "Bhishma Pitamah was the towering moral pillar of the Kuru dynasty. Renowned for his absolute adherence to vows, unmatched martial supremacy, and profound wisdom, he protected Hastinapura through generations of turbulent transition.",
                "His fatal flaw was his unshakeable vow to serve the throne of Hastinapura unconditionally, regardless of who sat upon it. This forced him to fight on the side of adharma against his beloved Pandavas during the war.",
                "He consciously engineered his own defeat on the battlefield, falling upon a bed of arrows crafted by Arjuna, waiting for the auspicious sun position to peacefully leave his mortal coil."
            ],
            "spiritualSignificance": "Represents the conflict of duty; his rigid adherence to serving a corrupted throne over higher truth serves as a major lesson in ethical discernment.",
            "gitaConnection": "Represents the conflict of duty; his rigid adherence to serving a corrupted throne over higher truth serves as a major lesson in ethical discernment.",
            "keyTeaching": "Duty to an institution must never supersede supreme moral truth and justice.",
            "image": "/uploads/bhishma.png"
        },
        {
            "id": "drona",
            "name": "Acharya Dronacharya",
            "sanskritName": "आचार्य द्रोण",
            "title": "Royal Guru of Arms",
            "faction": "KAURAVA",
            "description": "The master military preceptor who trained both Pandavas and Kauravas in supreme martial arts.",
            "summary": "The master military preceptor who trained both Pandavas and Kauravas in supreme martial arts.",
            "theme": "Royal Guru of Arms",
            "highlights": [
                "Born from a miraculous vessel (Drona), master of divine celestial astras",
                "Supreme military preceptor of the Kuru princes and Karna",
                "Compromised his principles out of financial dependence and royal obligation to Hastinapura"
            ],
            "keyPoints": [
                "Born from a miraculous vessel (Drona), master of divine celestial astras",
                "Supreme military preceptor of the Kuru princes and Karna",
                "Compromised his principles out of financial dependence and royal obligation to Hastinapura"
            ],
            "fullDetails": [
                "Acharya Drona was the preeminent military scientist of his era. Impoverished in his youth, he harbored resentment toward his childhood friend Drupada before finding a permanent home in the royal court of Hastinapura.",
                "He trained both Pandavas and Kauravas into world-class warriors, treating Arjuna as his favorite pupil. However, his financial dependence on the Kuru throne forced him to fight against his own righteous principles in the war.",
                "He met his end on the battlefield when he laid down his weapons upon hearing a false rumor of his son’s death, illustrating how compromised integrity leads to tragic downfalls."
            ],
            "spiritualSignificance": "Shows how material dependence and pride can compromise even an enlightened teacher's moral clarity.",
            "gitaConnection": "Shows how material dependence and pride can compromise even an enlightened teacher's moral clarity.",
            "keyTeaching": "Compromising ethical integrity for material security destroys spiritual authority.",
            "image": "/uploads/drona.png"
        },
        {
            "id": "kripacharya",
            "name": "Guru Kripacharya",
            "sanskritName": "कृपाचार्य",
            "title": "The Immortal Preceptor",
            "faction": "KAURAVA",
            "description": "The wise and immortal royal teacher of the Kuru princes who fought on the side of the Kauravas.",
            "summary": "The wise and immortal royal teacher of the Kuru princes who fought on the side of the Kauravas.",
            "theme": "The Immortal Preceptor",
            "highlights": [
                "One of the seven Chiranjeevis (immortals) blessed to live across cosmic time cycles",
                "Uncle of Ashwatthama, serving as royal archery instructor alongside Drona",
                "Survived the Kurukshetra war and lived on to tutor the next generation of Kuru heirs"
            ],
            "keyPoints": [
                "One of the seven Chiranjeevis (immortals) blessed to live across cosmic time cycles",
                "Uncle of Ashwatthama, serving as royal archery instructor alongside Drona",
                "Survived the Kurukshetra war and lived on to tutor the next generation of Kuru heirs"
            ],
            "fullDetails": [
                "Kripacharya and his twin sister Kripi were discovered as infants by King Shantanu during a hunt and raised with royal affection. Trained in martial arts, Kripacharya became the official preceptor of the Kuru princes prior to Drona's arrival.",
                "Though he recognized the righteousness of the Pandavas, his lifelong loyalty to the Kuru state bound him to fight on the Kaurava side during the great war.",
                "He was one of the very few surviving warriors of the Kurukshetra war, later guiding Emperor Parikshit during his righteous reign."
            ],
            "spiritualSignificance": "Represents resilience and survival through the shifting ages of cosmic time.",
            "gitaConnection": "Represents resilience and survival through the shifting ages of cosmic time.",
            "keyTeaching": "Wisdom and resilience enable a soul to navigate through cataclysmic societal shifts.",
            "image": "/uploads/kripacharya.png"
        },
        {
            "id": "ashwatthama",
            "name": "Ashwatthama",
            "sanskritName": "अश्वत्थामा",
            "title": "The Cursed Immortal Warrior",
            "faction": "KAURAVA",
            "description": "Dronacharya’s fierce and proud son, gifted with immortality, who fought to his bitter end.",
            "summary": "Dronacharya’s fierce and proud son, gifted with immortality, who fought to his bitter end.",
            "theme": "The Cursed Immortal Warrior",
            "highlights": [
                "Born with a divine gemstone (Mani) embedded in his forehead granting supernatural protection",
                "Fierce warrior driven to madness by the dishonorable assassination of his father Drona",
                "Cursed by God Krishna to wander the earth in isolation and agony for millennia"
            ],
            "keyPoints": [
                "Born with a divine gemstone (Mani) embedded in his forehead granting supernatural protection",
                "Fierce warrior driven to madness by the dishonorable assassination of his father Drona",
                "Cursed by God Krishna to wander the earth in isolation and agony for millennia"
            ],
            "fullDetails": [
                "Ashwatthama was Dronacharya’s beloved son, born with the cry of a celestial horse. A warrior of terrifying prowess, he possessed deep martial knowledge and immense pride in his lineage.",
                "His descent into darkness occurred when Drona was slain through trickery. Consumed by grief, rage, and vengeance, he committed the darkest war crime of the epic: slaughtering the sleeping Pandava camp in the dead of night.",
                "For this heinous act, God Krishna stripped him of his gemstone and cursed him with immortal, agonizing wandering across the earth, symbolizing the eternal torment of unbridled wrath."
            ],
            "spiritualSignificance": "Warns against the destructive cycle of vengeance, anger, and loss of inner peace.",
            "gitaConnection": "Warns against the destructive cycle of vengeance, anger, and loss of inner peace.",
            "keyTeaching": "Unbridled vengeance and anger destroy the soul, condemning it to eternal wandering in darkness.",
            "image": "/uploads/ashwatthama.png"
        },
        {
            "id": "sanjaya",
            "name": "Sanjaya",
            "sanskritName": "संजय",
            "title": "The Visionary Chronicler",
            "faction": "KAURAVA",
            "description": "Blessed with divine vision by Sage Vyasa, he narrated the entire Kurukshetra war live to King Dhritarashtra.",
            "summary": "Blessed with divine vision by Sage Vyasa, he narrated the entire Kurukshetra war live to King Dhritarashtra.",
            "theme": "The Visionary Chronicler",
            "highlights": [
                "Gifted 'Divya Drishti' (clairvoyance) to see events across time and space instantly",
                "Served as a fearless counselor of truth to blind King Dhritarashtra",
                "The narrator of the entire Bhagavad Gita dialogue between Krishna and Arjuna"
            ],
            "keyPoints": [
                "Gifted 'Divya Drishti' (clairvoyance) to see events across time and space instantly",
                "Served as a fearless counselor of truth to blind King Dhritarashtra",
                "The narrator of the entire Bhagavad Gita dialogue between Krishna and Arjuna"
            ],
            "fullDetails": [
                "Sanjaya began his career as a humble charioteer and counselor in the court of Hastinapura. When the war approached, sage Vyasa granted him divine vision so he could report every detail of the battlefield live to King Dhritarashtra.",
                "Sanjaya’s position was unique: he possessed total objectivity, seeing the brutal destruction of adharma while remaining entirely detached from the bloodshed.",
                "His narration of the Bhagavad Gita forms the foundational dialogue of sacred scripture, embodying truth, clarity, and unflinching witness to cosmic reality."
            ],
            "spiritualSignificance": "The narrator of the Gita frame story, embodying truthful perception, objectivity, and inner clarity.",
            "gitaConnection": "The narrator of the Gita frame story, embodying truthful perception, objectivity, and inner clarity.",
            "keyTeaching": "True spiritual clarity requires objective perception and freedom from emotional bias.",
            "image": "/uploads/sanjaya.png"
        }
    ]

    db.characters.delete_many({})
    db.characters.insert_many(characters_data)
    print("✅ Characters successfully seeded into MongoDB collection 'characters' with complete info!")

if __name__ == "__main__":
    seed_characters()