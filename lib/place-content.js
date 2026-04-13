/**
 * Long-form category content for /products/[placeSlug] pages.
 * Consumed by app/products/[placeSlug]/page.js to render buying guides,
 * material notes, and FAQs below the ProductCatalog component.
 *
 * Tone: professional B2B, tier-1 source references only, no fabricated stats.
 */
export const placeContent = {
  hotel: {
    intro:
      "DMD Furnishing is a hotel guestroom furniture manufacturer supplying contract-grade casegoods, headboards, desks, and lobby seating to select-service, full-service, and boutique properties. Every hotel FF&E piece is built for commercial durability and the brand prototype books major flags publish. Guestroom furniture carries the heaviest usage load in any property, absorbing daily housekeeping chemistry, guest turnover, and thousands of check-ins without looking tired by year five. Our hotel casegoods scope covers complete guestroom packages, corridor consoles, custom millwork, and public-area seating.",
    buyingGuide: [
      {
        title: "Specify to contract-grade standards",
        text: "Contract-grade testing validates structural integrity, joint strength, and cyclic load performance for commercial use. Guestroom casegoods and seating should meet contract-grade minimums, not residential standards, to survive the seven-to-ten-year renovation cycle most brands require.",
      },
      {
        title: "Match finishes to your brand prototype",
        text: "Major flags publish FF&E design standards with approved finish families, edge profiles, and hardware specs. Confirm your manufacturer can hit these exact finishes in production, not just in samples, before PIP or new-build approval stages.",
      },
      {
        title: "Plan for housekeeping, not guests",
        text: "Guests use a room; housekeepers clean it every day. Specify edge-banded tops, recessed hardware, and scratch-resistant HPL on horizontal surfaces exposed to carts, vacuums, and cleaning chemicals to avoid premature refinish cycles.",
      },
      {
        title: "Coordinate lead times with the GC schedule",
        text: "Custom hospitality casegoods carry production lead times that vary by scope and finish complexity after final shop drawings. Lock specifications early and stage deliveries to match drywall, paint, and flooring sequencing so installation does not become the critical path.",
      },
      {
        title: "Budget for installation and warehousing",
        text: "FF&E pricing is only part of the landed cost. Receiving, inspection, warehousing, blanket-wrap delivery, and room-by-room installation should be quoted upfront so ownership and the operator can compare apples-to-apples bids across manufacturers.",
      },
    ],
    materials:
      "Hotel guestroom casegoods typically combine high-pressure laminate (HPL) tops and sides for scratch and moisture resistance with hardwood veneer or solid-wood accents where tactile quality matters. Drawer boxes use dovetailed hardwood or heavy-duty ply with full-extension soft-close slides. Headboards and upholstered benches require contract-grade foam and commercial face fabrics for guestroom and public-area use. Metal bases and frames are powder-coated steel, and hardware is selected from commercial product lines rated for high-cycle use.",
    faqs: [
      {
        question: "What is the difference between residential and contract-grade hotel furniture?",
        answer:
          "Contract-grade furniture is engineered and tested to commercial durability standards, using heavier substrates, reinforced joinery, and commercial hardware rated for high-cycle use. Residential furniture is built for lower usage intensity and will typically fail structurally or cosmetically long before a hotel renovation cycle completes.",
      },
      {
        question: "Can you manufacture to a brand's FF&E design standards?",
        answer:
          "Yes. We work from brand prototype books, approved finish schedules, and owner-supplied shop drawing standards to build casegoods, headboards, and millwork that meet flag requirements. Our shop drawings are submitted for owner, operator, and brand approval before production is released to the floor.",
      },
      {
        question: "What lead times should we plan for on a full guestroom package?",
        answer:
          "Production timelines depend on scope, finish complexity, and unit count. Early specification lock and finish approval are the biggest factors in keeping FF&E off the project's critical path. We provide a written timeline at contract signing.",
      },
    ],
  },
  restaurant: {
    intro:
      "DMD Furnishing manufactures commercial restaurant furniture: custom banquettes, upholstered booths, dining chairs, bar stools, and host stands for independent operators, restaurant groups, and hospitality developers. Restaurant seating operates in one of the harshest commercial environments in the built world: dining chairs absorb continuous turnover, booths take spilled food and beverage, and bar stools survive daily dragging, stacking, and sanitizing. Our commercial dining furniture scope runs from quick-service to fine dining and hotel F&B outlets, including outdoor-rated patio pieces.",
    buyingGuide: [
      {
        title: "Confirm flammability compliance before ordering",
        text: "Upholstered restaurant seating in most jurisdictions must meet fire safety standards for foam and face fabrics in public assembly spaces. Request flammability documentation from your manufacturer, not just verbal confirmation, and keep certificates in the project closeout binder.",
      },
      {
        title: "Match upholstery to the cleaning protocol",
        text: "Commercial-grade vinyl and polyurethane coated fabrics handle red wine, grease, and bleach wipe-downs far better than natural textiles. Specify the cleaning code with your upholstery supplier and verify it survives the chemicals your operator actually uses.",
      },
      {
        title: "Size banquettes to the operator's covers target",
        text: "Banquette seat depth, height, and back angle directly affect how many covers a restaurant can turn per hour. Coordinate dimensions with the operator and interior designer early, because changes after frame fabrication are expensive and schedule-impacting.",
      },
      {
        title: "Specify outdoor pieces for true outdoor conditions",
        text: "Patio and sidewalk furniture must resist UV, freeze-thaw cycles, and standing water. Powder-coated aluminum, marine-grade plywood, and outdoor-rated Sunbrella-class fabrics are required; indoor frames used outside will corrode and delaminate within a single season.",
      },
      {
        title: "Plan replacement stock from day one",
        text: "Front-of-house chairs and stools are consumables in high-volume restaurants. Order spare stock at the time of the initial run so replacements match in finish and dye lot, and so the operator is not scrambling mid-lease for obsolete pieces.",
      },
    ],
    materials:
      "Restaurant seating frames are typically solid European beech, oak, or ash for wood chairs, and welded powder-coated steel or aluminum for metal frames. Booth and banquette frames use kiln-dried hardwood with mortise-and-tenon or corner-block construction. Foam is commercial-grade high-density polyurethane, and face fabrics are selected for public assembly durability. Vinyl and polyurethane coated fabrics dominate booth applications because they withstand grease, wine, and bleach-based cleaners. Outdoor pieces require marine-grade substrates, stainless fasteners, and UV-stable finishes.",
    faqs: [
      {
        question: "Do you build custom banquettes to our floor plan?",
        answer:
          "Yes. We fabricate banquettes, booths, and upholstered bench seating from measured drawings or architect-supplied CAD, including curved runs, divider walls, and integrated power. Seat heights, depths, and back angles are specified with the operator and designer before shop drawings are released.",
      },
      {
        question: "What upholstery holds up best in high-volume restaurants?",
        answer:
          "Coated fabrics such as polyurethane, vinyl, and performance textiles perform best because they clean with standard restaurant sanitizers without staining or wicking. Natural fibers and uncoated wovens look premium but rarely survive the cleaning chemistry used in operating kitchens and dining rooms.",
      },
      {
        question: "Can the same chair be used indoors and outdoors?",
        answer:
          "Generally no. Indoor chairs use finishes and adhesives that fail under UV and moisture exposure. If a concept needs a consistent look inside and on a patio, we build two versions of the same silhouette using indoor and outdoor-rated substrates, fasteners, and finishes.",
      },
    ],
  },
  office: {
    intro:
      "DMD Furnishing manufactures commercial office furniture for corporate headquarters, coworking operators, professional services firms, and tenant fit-outs. Workplace scope now spans focused desks, collaborative lounge, phone rooms, and touchdown space, but the underlying requirement has not changed: commercial office furniture must support eight-hour workdays without causing musculoskeletal strain and hold up to reconfiguration as teams grow. Our catalog includes height-adjustable workstations, ergonomic task seating, conference tables, and acoustic millwork.",
    buyingGuide: [
      {
        title: "Specify task chairs to commercial durability standards",
        text: "Any task chair used eight hours a day should meet commercial durability and safety standards with documented test reports. Chairs that only cite generic weight ratings without independent testing should be treated skeptically.",
      },
      {
        title: "Prioritize adjustability over aesthetics",
        text: "Seat height, seat depth, lumbar position, arm height, and arm width should all adjust independently. A beautiful chair that only fits the fiftieth-percentile user will create ergonomic complaints from every employee outside that range within the first quarter of occupancy.",
      },
      {
        title: "Plan power and data before fixed furniture",
        text: "Height-adjustable desks, benching systems, and conference tables need to coordinate with floor cores, power poles, and modular wiring. Specifying the furniture first and retrofitting power is almost always more expensive than engineering both paths together.",
      },
      {
        title: "Account for acoustics in open plans",
        text: "Open workstations amplify conversation and keyboard noise. Acoustic panel walls, upholstered dividers, and enclosed phone rooms are no longer optional in dense plans. Budget acoustic treatment as part of furniture scope, not a late-stage add.",
      },
      {
        title: "Order spare stock for reconfiguration",
        text: "Office tenants reconfigure floors more often than they re-specify furniture. Ordering spare stock of workstation components, chair parts, and matching finishes makes future moves and team growth straightforward instead of triggering an entire re-procurement.",
      },
    ],
    materials:
      "Office casegoods and workstations typically use HPL or melamine work surfaces over particleboard or MDF substrates, edged in PVC or 3mm impact-resistant edge banding. Premium executive pieces use hardwood veneer over ply substrates. Task seating uses molded polymer shells, mesh backs, polyurethane foam seats, and powder-coated or polished aluminum bases. Frames for benching and conference tables are welded steel, often powder-coated. Upholstery on lounge and conference pieces is specified for commercial durability appropriate for contract use.",
    faqs: [
      {
        question: "How do we know a task chair is actually ergonomic?",
        answer:
          "Look for documented compliance with commercial durability standards and independent adjustability of seat height, seat depth, lumbar, and arms. Marketing language like ergonomic by itself is meaningless without test data and adjustment range specs. Ask for the chair's spec sheet and test reports.",
      },
      {
        question: "Can you integrate power and data into conference and benching tables?",
        answer:
          "Yes. We build conference tables, benching workstations, and collaboration tables with factory-installed power modules, grommets, cable troughs, and modular wiring compatibility. Electrical rough-in coordination happens during shop drawings so the millwork arrives ready to connect on site.",
      },
      {
        question: "How much spare stock should we order for a corporate fit-out?",
        answer:
          "It depends on headcount growth plans and how critical finish and model consistency are to the tenant's workplace standards. We can advise on the right spare stock percentage for your specific project during the specification phase.",
      },
    ],
  },
  hospital: {
    intro:
      "DMD Furnishing is a healthcare furniture manufacturer supplying hospitals, outpatient clinics, medical office buildings, and long-term care facilities with waiting area seating, patient room casegoods, nursing station millwork, and bariatric-rated chairs. Healthcare furniture lives at the intersection of patient dignity, infection control, and structural durability, supporting sick and immunocompromised users while standing up to daily chemical disinfection. Our healthcare-grade scope meets the load, hygiene, and cleanability requirements of modern clinical environments.",
    buyingGuide: [
      {
        title: "Specify bleach-cleanable upholstery only",
        text: "Healthcare upholstery should withstand hospital disinfectants and bleach solutions without degrading. Polyurethane coated fabrics, performance textiles, and medical vinyls are common choices. Avoid any upholstery without an explicit cleaning and disinfection warranty from the mill.",
      },
      {
        title: "Eliminate crevices and seams wherever possible",
        text: "Every seam, zipper, and joint becomes a reservoir for pathogens. Welded seams, moisture barriers under upholstery, and closed-bottom seat platforms reduce cleaning time and infection risk compared to traditional button-tufted or piped construction.",
      },
      {
        title: "Include bariatric capacity in waiting areas",
        text: "Best practice is to include bariatric-rated seating, typically 500 to 750 pound capacity, in every waiting area. These chairs should match the aesthetic of standard seating so patients can self-select without being singled out at the point of care.",
      },
      {
        title: "Coordinate with infection prevention teams",
        text: "Infection preventionists should review upholstery, finish, and construction specs before purchase. They often have institutional standards or prior product failures that inform which manufacturers and product families are approved for clinical environments.",
      },
      {
        title: "Design for cleaning staff, not just clinicians",
        text: "Environmental services teams clean the furniture more often than clinicians use it. Smooth, wipeable surfaces, lift-to-clean seats, and accessible floor clearance dramatically reduce labor time and improve actual, as-used cleanliness compared to designs that only photograph well.",
      },
    ],
    materials:
      "Healthcare casegoods typically use HPL or thermofoil over moisture-resistant MDF substrates, chosen for bleach compatibility and ease of repair. Patient room wardrobes and overbed tables use closed-cell edge banding to prevent fluid intrusion. Seating frames are welded steel or hardwood with moisture barriers between the upholstery and foam. Upholstery is specified from healthcare-rated lines including medical polyurethane, performance textiles, or antimicrobial vinyls compatible with hospital disinfectants. Foam and fabrics are selected to meet applicable fire safety codes.",
    faqs: [
      {
        question: "What upholstery should we specify for patient rooms and waiting areas?",
        answer:
          "Use healthcare-rated coated fabrics or polyurethane upholstery with documented compatibility for bleach and quaternary disinfectants. Medical vinyls, performance textiles, and similar product families provide cleanability warranties and moisture barriers that uncoated wovens cannot match in a clinical setting.",
      },
      {
        question: "Do you provide bariatric-rated seating?",
        answer:
          "Yes. We specify and supply bariatric chairs engineered for 500, 600, and 750 pound capacities, depending on the clinical application. These chairs use reinforced frames, wider seat dimensions, and healthcare-grade upholstery while maintaining aesthetic consistency with standard waiting area seating.",
      },
      {
        question: "How is healthcare furniture different from regular commercial furniture?",
        answer:
          "It is engineered for continuous chemical disinfection, infection control, and higher structural loads than standard commercial pieces. Seams, foams, barriers, and finishes are all selected for compatibility with hospital cleaning protocols, and construction is simplified to eliminate the crevices that collect contaminants.",
      },
    ],
  },
  "educational-facilities": {
    intro:
      "DMD Furnishing is a classroom furniture manufacturer and educational facility furniture supplier for K-12 schools, colleges and universities, residence halls, libraries, and institutional learning spaces. Classroom chairs, dormitory casegoods, and library tables are engineered for contract-grade commercial durability. Educational furniture takes more physical abuse than almost any other commercial category. Chairs get dragged, stacked, tipped back, and kicked; dormitory casegoods absorb semesters of student move-ins. Our educational facility furniture scope includes classroom seating, residence hall wardrobes and beds, library carrels, and flexible collaboration pieces for active learning environments.",
    buyingGuide: [
      {
        title: "Specify impact-resistant edges and finishes",
        text: "Classroom and dorm furniture lives with dragged chairs, kicked legs, and backpack abuse. 3mm impact-resistant PVC edge banding, hardwood-reinforced corners, and steel reinforcements in high-contact areas significantly extend usable life before refurbishment is required.",
      },
      {
        title: "Size furniture to the age group",
        text: "Elementary, middle, high school, and higher education all require different seat heights, desk heights, and sight-line ergonomics. Specifying one adult-sized package across an entire district produces chronic posture and attention problems in younger grades.",
      },
      {
        title: "Plan for flexibility in active learning spaces",
        text: "Modern classrooms reconfigure multiple times a day between lecture, small group, and project work. Lightweight, mobile, nesting, and easily stackable furniture enables teachers to change layouts without facilities support or lost instructional time.",
      },
      {
        title: "Budget for institutional warranties",
        text: "Education sector buyers should insist on multi-year structural warranties, not the one-year residential warranties common on consumer lines. Contract-grade furniture with long-term frame warranties is standard for institutional procurement.",
      },
      {
        title: "Coordinate dormitory furniture with housing operations",
        text: "Dormitory wardrobes, beds, and desks must align with housing operations schedules for turnover, cleaning, and bed-bug mitigation. Specify designs that can be disassembled, cleaned, and moved by housing staff without specialized tools or replacement parts.",
      },
    ],
    materials:
      "Educational casegoods use HPL or thermofoil over heavy particleboard or MDF substrates, edged in 3mm impact-resistant PVC. Dormitory beds and wardrobes often use welded steel frames for maximum durability and bed-bug resistance. Classroom chairs combine polypropylene or polymer shells with welded steel frames and powder-coated finishes. Library tables and carrels typically use hardwood veneer on ply substrates for aesthetic quality in high-visibility spaces. Upholstered soft seating in common areas is specified for contract-grade commercial durability and fire safety compliance.",
    faqs: [
      {
        question: "What construction holds up best in dormitories?",
        answer:
          "Welded steel frame beds and wardrobes, HPL-faced particleboard casegoods with 3mm PVC edge banding, and chairs with steel or reinforced polymer frames. These constructions resist move-in damage, tolerate institutional cleaning, and can be disassembled for bed-bug treatments without destroying the furniture.",
      },
      {
        question: "Can you provide furniture for active learning classrooms?",
        answer:
          "Yes. We supply mobile student chairs with casters, nesting tables, height-adjustable teacher stations, and modular collaboration pieces designed for rapid reconfiguration. All pieces are built for contract-grade commercial durability and are suitable for K-12 and higher education environments.",
      },
      {
        question: "What warranty should institutional buyers expect?",
        answer:
          "Institutional education buyers should expect multi-year structural frame warranties from contract manufacturers, with shorter warranties on wear components like upholstery, foam, and casters. Any vendor offering only a one-year warranty is selling residential-grade product. We document specific warranty terms in writing at project close-out.",
      },
    ],
  },
  residential: {
    intro:
      "DMD Furnishing manufactures multi-family amenity furniture for apartment developers, property management companies, student housing operators, and senior living communities. Clubhouse sofas, leasing office desks, rooftop seating, and package-room casegoods are built to contract-grade commercial durability, not residential-grade, because amenity spaces see hospitality-level traffic. Multi-family residential furniture is a commercial category, not a consumer one: apartment clubhouses, leasing offices, amenity lounges, and rooftop common areas are used by hundreds of residents every week. Our multi-family amenity furniture scope spans leasing offices, clubhouse lounge and dining, fitness lobbies, and outdoor pool decks.",
    buyingGuide: [
      {
        title: "Specify contract-grade, not residential-grade",
        text: "Furniture in multi-family common areas gets hospitality-level use and must be specified to contract-grade commercial standards. Sofas and chairs from consumer retailers will structurally fail within eighteen to twenty-four months in a busy clubhouse, regardless of how premium they looked at purchase.",
      },
      {
        title: "Design for property management staff turnover",
        text: "Onsite staff change frequently, and no one will remember the original spec in three years. Standardize finishes, hardware, and fabrics across the property so maintenance teams can source replacements easily without reverse-engineering discontinued residential products.",
      },
      {
        title: "Choose upholstery for stain cleanup, not showroom feel",
        text: "Performance fabrics and coated textiles clean up after coffee, wine, and makeup in public lounges. Specifying uncoated linens and velvets in a clubhouse guarantees a complete upholstery replacement cycle long before the building's first major capital plan.",
      },
      {
        title: "Plan outdoor amenity furniture for the climate",
        text: "Pool decks and rooftops are brutal UV and moisture environments. Powder-coated aluminum frames, marine-grade substrates, and UV-stable outdoor fabrics are non-negotiable. Indoor furniture used outside will look abandoned within a single leasing season.",
      },
      {
        title: "Integrate furniture budgets into the pro forma early",
        text: "Amenity furniture often gets squeezed at the end of construction when budgets are tight. Including realistic FF&E numbers in the development pro forma from the start prevents last-minute substitutions that undermine the entire amenity positioning of the property.",
      },
    ],
    materials:
      "Multi-family amenity furniture uses contract-grade construction similar to hospitality: kiln-dried hardwood frames, reinforced joinery, and commercial-grade foams. Casegoods and leasing office desks use HPL or hardwood veneer over ply substrates with commercial hardware. Upholstery is specified from performance and coated fabric lines tested for heavy public use. Outdoor amenity pieces require powder-coated aluminum, marine-grade plywood or HDPE substrates, and outdoor-rated fabrics engineered for continuous UV and moisture exposure.",
    faqs: [
      {
        question: "Why can't we just buy from a consumer furniture retailer for our clubhouse?",
        answer:
          "Consumer furniture is built for single-household use and is not warranted for public, commercial, or multi-family common area environments. Frames, foams, and upholstery fail quickly under amenity-level traffic, and replacement cycles become far more expensive than specifying contract-grade furniture from the outset.",
      },
      {
        question: "Do you handle leasing office furniture as well as amenity spaces?",
        answer:
          "Yes. We supply and manufacture leasing office desks, chairs, reception millwork, model unit furniture, and full amenity space packages under a single scope. Coordinating leasing, clubhouse, fitness lobby, and rooftop through one manufacturer simplifies specifications, lead times, and warranty management.",
      },
      {
        question: "How do you recommend handling outdoor pool deck and rooftop furniture?",
        answer:
          "Specify powder-coated aluminum or marine-grade frames with outdoor-rated performance fabrics and UV-stable finishes designed specifically for continuous outdoor exposure. Indoor-outdoor hybrid pieces and consumer patio furniture are not appropriate for multi-family amenity decks and will require premature replacement.",
      },
    ],
  },
  "lobby-area": {
    intro:
      "DMD Furnishing is a commercial lobby furniture manufacturer producing custom reception desks, statement sofas, lounge chairs, and oversized feature pieces for hotels, corporate headquarters, multi-family developments, healthcare facilities, and civic buildings. Every reception desk integrates factory-coordinated power and data, and millwork finishes matched to adjacent architectural stone or wood. Lobby furniture has to work at architectural scale, read well from the entry, and survive luggage, wheeled carts, and cleaning crews every day of its service life. Our custom reception desk and lobby seating scope anchors double-height and monumental public spaces.",
    buyingGuide: [
      {
        title: "Design for scale, not showroom dimensions",
        text: "Double-height lobbies swallow standard-sized furniture. Sofas, chairs, and tables in these spaces often need to be upsized beyond typical hospitality dimensions so they read at scale from across the room and relate properly to the architecture surrounding them.",
      },
      {
        title: "Specify reception desks to operational reality",
        text: "A reception desk has to accommodate monitors, printers, power, and guest sign-in. Coordinate with IT, security, and operations before drawing the desk, not after, to avoid cable chases and rework during the final construction push.",
      },
      {
        title: "Choose upholstery that survives public traffic",
        text: "Lobby seating is used by people with luggage, wet umbrellas, coffee, and unknown intentions. Performance fabrics, leathers rated for contract use, and coated textiles with contract-grade abrasion testing are appropriate. Residential upholstery will not survive the first year of public occupancy.",
      },
      {
        title: "Allow circulation and ADA clearances around every piece",
        text: "Lobbies are circulation spaces first and seating spaces second. Maintain the required accessible routes around every sofa, lounge chair, and table so that code compliance and wayfinding are not compromised by statement furniture placement.",
      },
      {
        title: "Protect floors from heavy oversized pieces",
        text: "Statement sofas and feature tables carry significant point loads. Specify glides, felt pads, or protective bases appropriate to the stone, tile, or hardwood flooring so that the furniture does not scratch or indent the most expensive finish in the building.",
      },
    ],
    materials:
      "Lobby furniture typically uses hardwood veneer or stone tops over reinforced substrates for statement tables and reception desks, with kiln-dried hardwood frames on upholstered pieces. Reception desks integrate solid surface, quartz, or wood tops over steel or millwork substructure, with factory-coordinated power, data, and cable management. Upholstery on public lobby seating is specified for contract-grade abrasion and durability, using performance fabrics, contract leathers, or coated textiles. Frames and hardware are selected for continuous public-area use.",
    faqs: [
      {
        question: "Can you build a custom reception desk for our lobby?",
        answer:
          "Yes. We design and manufacture custom reception and concierge desks from architect or designer drawings, including integrated power, data, and cable management. Finishes can be matched to lobby millwork, stone, and adjacent architectural elements during shop drawing review.",
      },
      {
        question: "How do you handle oversized furniture for double-height lobbies?",
        answer:
          "Oversized lounge seating and feature tables are built to custom dimensions in our shop and delivered in sections when needed to clear elevators and doorways. Final assembly happens on site, and pieces are engineered for reassembly if the lobby is ever reconfigured or refurbished.",
      },
      {
        question: "What upholstery should we specify for a high-traffic public lobby?",
        answer:
          "Use contract-grade performance fabrics, coated textiles, or contract leathers with documented abrasion ratings appropriate for heavy public use. These materials clean up after everyday lobby incidents without staining and meet the flammability and durability standards required for public-area commercial furniture.",
      },
    ],
  },
};
