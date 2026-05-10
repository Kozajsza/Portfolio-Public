import rebootCard from './screenshots/Reboot/Reboot.png'
import rebootHomepage from './screenshots/Reboot/Homepage.png'
import rebootBooking from './screenshots/Reboot/Booking.png'
import rebootBookingReview from './screenshots/Reboot/BookingReview.png'
import rebootEmployeeDashboard from './screenshots/Reboot/EmployeeDashboard.png'
import rebootAssetIndex from './screenshots/Reboot/AssetIndex.png'

import wasteToolCard from './screenshots/WasteTool/Audit.png'
import wasteToolCrud from './screenshots/WasteTool/crud.png'
import wasteToolSummary from './screenshots/WasteTool/summary.png'

import wasteToolAiCard from './screenshots/WasteToolAI/Audit.png'
import wasteToolAiSettings from './screenshots/WasteToolAI/AISettings.png'
import wasteToolAiBenchmarking from './screenshots/WasteToolAI/Benchmarking.png'
import wasteToolAiCustomer from './screenshots/WasteToolAI/Customer.png'
import wasteToolAiSummaryImg from './screenshots/WasteToolAI/Summary.png'

import hddScannerCard from './screenshots/HDDScanner/Scanner.png'
import hddScannerNewJob from './screenshots/HDDScanner/NewJob.png'
import hddScannerScan1 from './screenshots/HDDScanner/Screenshot_20260509_120307.png'
import hddScannerScan2 from './screenshots/HDDScanner/Screenshot_20260509_120343.png'
import hddScannerOrder from './screenshots/HDDScanner/Screenshot_20260509_120408.png'

export type ProjectStatus = 'production' | 'archived' | 'coming-soon' | 'flagship' | 'beta'

export interface ProjectHighlight {
  description: string
  codeSnippet: string
  language: string
}

export interface ProjectScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface Project {
  slug: string
  title: string
  oneLiner: string
  status: ProjectStatus
  techStack: string[]
  timeframe: string
  githubUrl?: string
  liveUrl?: string
  cardImage?: string
  cardPreview?: { snippet: string; language: string }
  cardAccent?: 'jade'
  problem: string
  solution: string
  highlights: ProjectHighlight[]
  screenshots: ProjectScreenshot[]
  tags: string[]
  featured: boolean
  displayOrder: number
  nextSlug: string
  relatedSlug?: string
  toastMessage?: string
}

export const projects: Project[] = [
  {
    slug: 'waste-audit',
    title: 'Waste Audit Tool',
    oneLiner: 'Production Django waste audit tool — guides field auditors through structured container assessment and generates contamination reports. Deployed on a NAS server and used in real audits.',
    status: 'production',
    techStack: ['Django 4.2', 'Python', 'SQLite', 'Tailwind CSS', 'Docker', 'Pandas', 'ApexCharts', 'Pillow', 'django-imagekit', 'openpyxl'],
    timeframe: '2024–present',
    githubUrl: 'https://github.com/Kozajsza/FMAuditPortfolioVersion',
    problem: `Waste management auditors were conducting assessments using paper forms and spreadsheets. Each container — bags and bins covering five waste stream inputs (DMR, General Waste, Cardboard, Coffee/Food, Single Stream) — had to be photographed, weighed, and manually broken down into up to 15 material categories. Photos were stored separately from reports, and generating a contamination summary meant manual calculation across multiple sheets.\n\nThe process was slow, inconsistent across auditors, and produced data that was almost impossible to aggregate. The company had no way to compare contamination rates across customers or over time.`,
    solution: `I built a Django web application with a three-stage workflow: auditors create an audit, add containers one by one (capturing a photo directly in-browser via the webcam API, selecting the waste stream, and logging the weight), then record the material breakdown for each container. A summary view computes contamination percentages per stream using stream-specific rules, renders ApexCharts visualisations, and generates a printable A4 report. The full audit can also be exported to Excel via Pandas/openpyxl.\n\nThe app is deployed on a NAS server inside the company network and accessed from phones and tablets on-site. The entire stack runs in Docker for reliable deployment and updates. A smart weight counter in the browser prevents auditors from accidentally entering material weights that exceed the container total.`,
    highlights: [
      {
        description: 'Stream-specific contamination calculation — aggregates AuditOutput weights per container, applies per-stream contamination rules (GW, DMR, Single Stream each have different accepted material lists and a 44 g tare allowance), and returns flagged streams and a compliance verdict used by both the summary view and ApexCharts.',
        codeSnippet: `CONTAMINATED_TYPES = get_contaminated_types()  # stream → set of non-compliant materials

def compute_contamination(container, outputs):
    total = sum(o.weight for o in outputs if o.weight) or 0
    tare = 44  # grams — standard bag tare
    net = max(total - tare, 0)

    breakdown = {}
    flagged = []

    for output in outputs:
        if not output.weight:
            continue
        pct = round((output.weight / net) * 100, 1) if net else 0
        breakdown[output.type] = {
            "weight_g": output.weight,
            "percentage": pct,
        }
        if output.type in CONTAMINATED_TYPES.get(container.container_stream, set()):
            flagged.append(output.type)

    return {
        "net_weight_g": net,
        "breakdown": breakdown,
        "flagged": flagged,
        "is_compliant": len(flagged) == 0,
    }`,
        language: 'python',
      },
    ],
    cardImage: wasteToolCard,
    screenshots: [
      { src: wasteToolCard, alt: 'Waste Audit Tool welcome screen', caption: 'Welcome screen: two-entry-point layout for starting a new audit or reviewing existing ones' },
      { src: wasteToolCrud, alt: 'Audit list', caption: 'Audit list: all sessions with customer, site, date, auditor, and quick-action buttons' },
      { src: wasteToolSummary, alt: 'Waste stream breakdown report', caption: 'Waste stream report: per-material weight totals with stream-specific recycling guidance' },
    ],
    tags: ['Django', 'Python', 'Production', 'Docker'],
    featured: true,
    displayOrder: 1,
    nextSlug: 'reboot',
    relatedSlug: 'waste-audit-ai',
    toastMessage: 'Did you know this tool is used in real waste audits every week?',
  },
  {
    slug: 'reboot',
    title: 'Reboot Project',
    oneLiner: 'A full-stack ITAD (IT asset disposal) platform with instant online quote engine, multi-step self-service booking, Blancco XML import pipeline, eBay price scraping, and a separate employee operations dashboard — deployed on Render and live in production.',
    status: 'flagship',
    techStack: ['Django 5', 'Django REST Framework', 'PostgreSQL', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Pandas', 'lxml', 'BeautifulSoup'],
    timeframe: '2024–present',
    liveUrl: 'https://rebootproject.co.uk/',
    cardImage: rebootCard,
    problem: `The UK ITAD market runs almost entirely on phone calls and "contact us" forms. Every major competitor — from tier-1 operators like S2S Group down to smaller London firms — requires a customer to speak to a salesperson before they can get a quote or book a collection. No UK ITAD company offers genuine self-service online booking with an instant price estimate. Customers disposing of IT equipment have no way to know what their devices are worth before agreeing to hand them over.\n\nThe operational side of ITAD is equally fragmented. When devices arrive at a processing facility, data wipe reports (exported from tools like Blancco as XML) are manually re-entered into inventory systems. Market pricing for refurbishable hardware is checked by hand on eBay. There is no single platform that takes a device from customer booking through wipe verification, grading, pricing, and rebate calculation.\n\nI built Reboot to solve both sides of that problem — and in doing so produced a platform with no direct equivalent in the UK ITAD market.`,
    solution: `Reboot is a three-service production system: a Django 5 + DRF backend API, a customer-facing React frontend (rebootproject.co.uk), and a separate React employee dashboard. The backend exposes 30+ endpoints covering the full asset lifecycle.\n\nThe most technically complex piece is the quote engine. I built a bin-packing algorithm from scratch in Python (QuoteCalculations.py) that groups items by type and disposal treatment, then determines how many collection containers of which type (Big Tote, Small Tote, Bag, Sticker) are needed based on per-item weight, quantity caps, and handling rules specific to each device category. The same engine calculates per-item disposal costs and estimated rebates in a single server-side pass, replacing what would otherwise require dozens of individual API calls from the frontend.\n\nThe Blancco import pipeline (BlanccoImportPC.py) parses multi-section XML audit reports from the Blancco Drive Eraser tool using lxml, normalises raw hardware identifiers (cleaning manufacturer noise like "Inc.", resolving Lenovo's non-standard model fields, snapping storage capacities to standard sizes), enriches each asset with a weight lookup against the item catalogue, auto-generates eBay listing metadata, and creates a ComputerAsset record — all from a single file upload. The eBay price lookup (ebaylookup.py) scrapes both sold and active listings using BeautifulSoup, strips price noise, and returns the median price with the five closest-to-median comparables, so employees can set data-driven resale prices without leaving the dashboard.\n\nThe customer booking flow is UUID-scoped: a guest customer gets a unique link and can select items from a 1,500+ entry catalogue (grouped by category → brand → model), review a live rebate estimate, and submit a collection order — all without creating an account. The order triggers a Brevo transactional email and creates the full container and order records server-side in a single atomic sequence handled by the React JobCreator script.\n\nThe platform is deployed on Render with three separate services and a managed PostgreSQL instance. Both frontends use environment-variable API URLs and are built via Render's CI pipeline from the main branch.`,
    highlights: [
      {
        description: 'Bin-packing algorithm that groups items by type and treatment, then fills containers according to per-category capacity rules (item count, weight limits, and container type selection) — the core of the quote engine, called server-side on every booking.',
        codeSnippet: `def pack_items_into_containers(items):
    containers = []
    grouped_items = {}

    for item in items:
        key = f"{item['Type']}-{item['treatment']}"
        if key not in grouped_items:
            grouped_items[key] = {
                "Type": item["Type"], "treatment": item["treatment"],
                "totalQuantity": 0, "totalWeight": 0, "detailedItems": []
            }
        grouped_items[key]["totalQuantity"] += item["quantity"]
        grouped_items[key]["totalWeight"] += item["Weight"] * item["quantity"]
        grouped_items[key]["detailedItems"].append({
            "Vendor": item["Vendor"], "Model": item["Model"],
            "quantity": item["quantity"],
            "disposalCost": calculate_disposal_cost(
                item["Type"], item["Weight"],
                item["treatment"] == "Data Wipe",
                item["treatment"] == "Destroy"
            ),
            "rebate": calculate_rebate(
                item["Price"], item["Type"], item["Weight"],
                item["treatment"] == "Destroy"
            ),
            "Weight": item["Weight"]
        })

    for group_key, group in grouped_items.items():
        Type = group["Type"]
        treatment = group["treatment"]
        detailedItems = group["detailedItems"]
        totalQuantity = group["totalQuantity"]
        totalWeight = group["totalWeight"]

        def add_container(container_type, max_items, max_weight_kg):
            nonlocal totalQuantity, totalWeight
            while totalQuantity > 0 and totalWeight > 0:
                container_qty = min(totalQuantity, max_items)
                container_weight = min(totalWeight, max_weight_kg * 1000)
                container_items = []
                weight_used = 0
                quantity_used = 0
                for item in detailedItems:
                    if quantity_used >= container_qty or weight_used >= container_weight:
                        break
                    item_qty = min(item["quantity"], container_qty - quantity_used)
                    item_weight = min(item["Weight"] * item_qty, container_weight - weight_used)
                    if item_qty > 0:
                        container_items.append({**item, "quantity": item_qty})
                        quantity_used += item_qty
                        weight_used += item_weight
                if container_items:
                    containers.append({
                        "qr": generate_qr_code(), "type": container_type,
                        "treatment": treatment,
                        "weight": round(weight_used / 1000, 2),
                        "items": f"{quantity_used}x {Type}",
                        "detailedItems": container_items
                    })
                totalQuantity -= quantity_used
                totalWeight -= weight_used

        if Type == 'Laptop':
            add_container("Big Tote", 7, 15)
        elif Type in ['Desktop', 'All-In-One', 'Server']:
            add_container("Sticker", 1, STANDARD_WEIGHTS[Type] / 1000)
        elif Type in ['Old Mobile', 'Smartphone', 'Tablet']:
            add_container("Small Tote" if totalQuantity <= 15 else "Big Tote", 15, 20)
        elif Type == 'Hard Drive':
            add_container(
                "Bag" if treatment == 'No treatment' else "Small Tote",
                40 if treatment == 'No treatment' else 10, 20
            )
        else:
            add_container("Bag", 10, 20)

    return containers`,
        language: 'python',
      },
      {
        description: 'Blancco XML import pipeline — parses a multi-section audit report using lxml, walks six independent XML sections with suffix-based column namespacing to avoid key collisions, normalises manufacturer strings and storage capacities, resolves Lenovo\'s non-standard model field, snaps raw storage sizes to standard values, and creates a fully-populated ComputerAsset record in one upload.',
        codeSnippet: `# Walk each report section independently — suffix prevents key collisions
for erasure_entry in erasure_entries:
    for child in erasure_entry:
        data.setdefault(child.get('name'), []).append(child.text)

for system_entry in system_entries:
    for child in system_entry:
        data.setdefault(child.get('name') + "_system", []).append(child.text)

for drive_entry in drive_entries:
    for child in drive_entry:
        data.setdefault(child.get('name') + "_drive", []).append(child.text)

for cpu_entry in cpu_entries:
    for child in cpu_entry:
        data.setdefault(child.get('name') + "_cpu", []).append(child.text)

# Pad shorter columns before DataFrame construction
max_len = max(len(lst) for lst in data.values())
for name in data:
    if len(data[name]) < max_len:
        data[name] += [None] * (max_len - len(data[name]))

df = pd.DataFrame(data)

# Lenovo ships model in version_system, not model_system
df['Model'] = np.where(df['Make'] == 'Lenovo', df['version_system'], df['model_system'])
df['Model'] = df['Model'].replace(model_replacements)  # JSON alias map

# Snap raw GB values to known standard capacities
common_capacities = [64, 128, 250, 256, 500, 640, 750, 1000, 2000, 4000]
df['Storage_Capacity'] = df['capacity_drive'].astype(float).div(1073741824).round(1)
df['Storage_Capacity'] = df['Storage_Capacity'].apply(
    lambda x: min(common_capacities, key=lambda y: abs(y - x))
)

df['Ecommerce_Title'] = (
    df['Make'] + " " + df['Model'] + " " + df['CPU'] + " "
    + df['RAM'].astype(str) + "GB RAM "
    + df['Storage_Capacity'].astype(str) + "GB " + df['Storage_Type']
)`,
        language: 'python',
      },
      {
        description: 'eBay market price lookup — scrapes sold and active listings via BeautifulSoup, cleans price strings, filters non-numeric rows, computes median market price, and returns the five closest-to-median comparables for employee pricing decisions.',
        codeSnippet: `def ebay_lookup(vendor, model):
    searchterm = f"{vendor} {model}".replace(" ", "+")
    urls = {
        "sold":   f'https://www.ebay.co.uk/sch/...&LH_Sold=1&LH_Complete=1',
        "active": f'https://www.ebay.co.uk/sch/...&LH_BIN=1&LH_ItemCondition=3000',
    }
    results = {}

    for key, url in urls.items():
        soup = BeautifulSoup(requests.get(url).text, 'html.parser')
        productslist = []

        for item in soup.find_all('div', {'class': 's-item__wrapper clearfix'}):
            title = item.find('div', {'class': 's-item__title'})
            price = item.find('span', {'class': 's-item__price'})
            link  = item.find('a',    {'class': 's-item__link'})
            image = item.find('div',  {'class': 's-item__image-wrapper'})
            if title and price and link:
                productslist.append({
                    "Title": title.text.strip(),
                    "Price": price.get_text(strip=True).split("to")[0].strip(),
                    "Link":  link['href'],
                    "Image": image.find('img')['src'] if image else None,
                })

        df = pd.DataFrame(productslist)
        if df.empty:
            results[key] = {"median_price": None, "top_3": []}
            continue

        df['Price'] = df['Price'].str.replace(r'[^0-9.]', '', regex=True)
        df = df[df['Price'].apply(lambda x: x.replace('.', '', 1).isdigit())]
        df['Price'] = df['Price'].astype(float)

        median_price = df['Price'].median()
        df['PriceDiff'] = abs(df['Price'] - median_price)
        results[key] = {
            "median_price": median_price,
            "top_3": df.sort_values('PriceDiff').head(5).to_dict(orient='records')
        }

    return results`,
        language: 'python',
      },
      {
        description: 'Bulk quote API endpoint — resolves 1,500+ catalogue items from three separate models (ComputerItem, MobileItem, OtherItem), calculates per-item disposal cost and rebate, runs the full packing simulation, and returns a rebate range (±15%), container summary with customer-friendly display names, and per-item breakdown in a single request — replacing what previously required N individual API calls from the frontend.',
        codeSnippet: `class CalculateQuoteBulkView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [QuoteRateThrottle]

    def _lookup_item(self, item_id, category):
        try:
            if category == 'computers':
                return ComputerItem.objects.get(pk=item_id)
            elif category == 'mobile':
                return MobileItem.objects.get(pk=item_id)
            else:
                return OtherItem.objects.get(pk=item_id)
        except (ComputerItem.DoesNotExist, MobileItem.DoesNotExist, OtherItem.DoesNotExist):
            return None

    def post(self, request):
        raw_items = request.data.get('items', [])
        packing_items, items_detail, errors = [], [], []

        for entry in raw_items:
            item = self._lookup_item(entry.get('item_id'), entry.get('item_category', 'computers'))
            if not item:
                errors.append(f"Item {entry.get('item_id')} not found"); continue

            qty       = int(entry.get('quantity', 1))
            treatment = entry.get('treatment', 'No treatment')
            data_wipe = treatment == 'Data Wipe'
            shredding = treatment == 'Destroy'

            unit_disposal = calculate_disposal_cost(item.Type, item.Weight, data_wipe, shredding)
            unit_rebate   = calculate_rebate(item.Price, item.Type, item.Weight, shredding)

            items_detail.append({
                'item_id': entry['item_id'], 'Type': item.Type,
                'Vendor': item.Vendor, 'Model': item.Model,
                'quantity': qty, 'treatment': treatment,
                'unit_disposal_cost': unit_disposal,
                'subtotal_disposal': round(unit_disposal * qty, 2),
                'subtotal_rebate':   round((unit_rebate or 0) * qty, 2),
            })
            packing_items.append({
                'Type': item.Type, 'Vendor': item.Vendor, 'Model': item.Model,
                'Weight': item.Weight, 'Price': item.Price,
                'Photo': item.Photo or '', 'quantity': qty, 'treatment': treatment,
            })

        containers = pack_items_into_containers(packing_items)
        total_rebate = sum(i['subtotal_rebate'] for i in items_detail)

        return Response({
            'items_detail':        items_detail,
            'total_disposal_cost': round(sum(i['subtotal_disposal'] for i in items_detail), 2),
            'total_rebate_low':    round(total_rebate * 0.85, 2),
            'total_rebate_high':   round(total_rebate * 1.15, 2),
            'containers_needed':   self._summarise_containers(containers),
            'collection_fee':      0.00,
            'errors':              errors,
        })`,
        language: 'python',
      },
      {
        description: 'Hierarchical item catalogue endpoint — builds a three-level nested structure (category → device type → brand → items) from three separate DB tables in a single request, pre-computes base disposal costs per item, and serialises defaultdicts to plain JSON for the booking UI\'s category/brand/model browse.',
        codeSnippet: `CATEGORY_MAP = {
    'Laptop': 'computers', 'Desktop': 'computers', 'All-In-One': 'computers',
    'Smartphone': 'mobile', 'Old Mobile': 'mobile', 'Tablet': 'mobile',
    'Printer': 'other',  'Monitor': 'other', 'Hard Drive': 'other',
}

class ItemCatalogueView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        def nested():
            return defaultdict(lambda: defaultdict(list))

        catalogue = {'computers': nested(), 'mobile': nested(), 'other': nested()}

        for item in ComputerItem.objects.all().order_by('Type', 'Vendor', 'Model'):
            catalogue['computers'][item.Type][item.Vendor].append({
                'id': item.id, 'Type': item.Type, 'Vendor': item.Vendor,
                'Model': item.Model, 'Weight': item.Weight, 'Price': item.Price,
                'Photo': item.Photo or '',
                'can_be_wiped': item.can_be_wiped,
                'can_be_shred': item.can_be_shred,
                'base_disposal_cost': calculate_disposal_cost(item.Type, item.Weight, False, False),
            })

        for item in MobileItem.objects.all().order_by('Type', 'Vendor', 'Model'):
            catalogue['mobile'][item.Type][item.Vendor].append({ ... })

        for item in OtherItem.objects.all().order_by('Type', 'Vendor', 'Model'):
            catalogue['other'][item.Type][item.Vendor].append({ ... })

        # Convert nested defaultdicts to plain dicts for JSON serialisation
        return Response({
            'computers': {t: dict(brands) for t, brands in catalogue['computers'].items()},
            'mobile':    {t: dict(brands) for t, brands in catalogue['mobile'].items()},
            'other':     {t: dict(brands) for t, brands in catalogue['other'].items()},
        })`,
        language: 'python',
      },
      {
        description: 'Environmental impact calculator — maps each asset type to peer-reviewed water and CO₂ savings constants, applies a destination multiplier (Reuse 1.0 × / Parts 0.8× / Material Recovery 0.6×) to compute actual vs. potential savings, and returns both figures so the customer dashboard and order records reflect what was actually achieved versus what would have been saved if every device were reused.',
        codeSnippet: `SAVINGS = {
    "Laptop":   {"water": 36.3, "carbon": 27.3},
    "Desktop":  {"water": 42.5, "carbon": 30.4},
    "SATA":     {"water": 4,    "carbon": 3},
    "nVME":     {"water": 2,    "carbon": 3},
    "monitor":  {"water": 8,    "carbon": 6},
}
DESTINATION_MULTIPLIER = {"Reuse": 1, "Parts": 0.8, "Material Recovery": 0.6}

def calculate_savings(assets):
    total_water = total_carbon = total_water_potential = total_carbon_potential = 0

    for asset_type, asset_list in assets.items():
        for asset in asset_list:
            kind        = asset.type if hasattr(asset, "type") else asset.storage_type
            destination = asset.destination or "Material Recovery"
            multiplier  = DESTINATION_MULTIPLIER.get(destination, 0)

            if kind in SAVINGS:
                total_water          += SAVINGS[kind]["water"]  * multiplier
                total_carbon         += SAVINGS[kind]["carbon"] * multiplier
                total_water_potential  += SAVINGS[kind]["water"]
                total_carbon_potential += SAVINGS[kind]["carbon"]

    return {
        "water_savings":            math.ceil(total_water),
        "co2_savings":              math.ceil(total_carbon),
        "water_savings_potential":  math.ceil(total_water_potential),
        "co2_savings_potential":    math.ceil(total_carbon_potential),
    }`,
        language: 'python',
      },
      {
        description: 'Frontend order creation script — fetches the customer\'s site by ID match, generates a YYMMDD+4-digit order number, auto-advances the requested date past weekends, builds a human-readable order description from the packed container data, creates the CollectionOrder, then fires all CollectionContainer creates in parallel via Promise.all — keeping the full booking sequence inside a single async function.',
        codeSnippet: `export const createJobAndContainers = async (orderData) => {
  const { guestCustomerData, packedData, totalDisposalCost, totalRebate, totalWeight } = orderData;

  // Resolve site — match by name + company ID
  const siteResponse = await axios.get(
    \`\${process.env.REACT_APP_API_URL}/api/recycling-customer-sites/?company=\${guestCustomerData.id}\`
  );
  const selectedSite = siteResponse.data.find(
    s => s.name === guestCustomerData.name && s.company === guestCustomerData.id
  ) ?? null;

  // Order number: YYMMDD + 4 random digits
  const orderNumber = \`\${dayjs().format('YYMMDD')}\${Math.floor(1000 + Math.random() * 9000)}\`;

  // Skip weekends for requested collection date
  let requestedDate = dayjs().add(2, 'day');
  if (requestedDate.day() === 6) requestedDate = requestedDate.add(2, 'day');
  if (requestedDate.day() === 0) requestedDate = requestedDate.add(1, 'day');

  const description = packedData.map(container => {
    const lines = container.detailedItems.map(item =>
      \`\${item.quantity}x - \${item.Vendor} \${item.Model}\\n\` +
      \`Disposal: £\${item.disposalCost.toFixed(2)}/item  Rebate: up to £\${(item.rebate||0).toFixed(2)}/item\`
    ).join('\\n');
    return \`\${container.type} — \${container.items}\\n\${lines}\`;
  }).join('\\n\\n');

  const { data: createdOrder } = await axios.post(
    \`\${process.env.REACT_APP_API_URL}/api/collection-orders/\`,
    { order_number: orderNumber, owner: guestCustomerData.id, site: selectedSite?.id ?? null,
      weight: totalWeight, requested_date: requestedDate.format('YYYY-MM-DD'),
      status: 'Booked', description, proposed_quote: totalDisposalCost, proposed_rebate: totalRebate }
  );

  // Parallel container creation
  const containerResults = await Promise.all(packedData.map(container =>
    axios.post(\`\${process.env.REACT_APP_API_URL}/api/collection-containers/\`, {
      type: container.type, container_qr: container.qr,
      weight: container.weight * 1000,
      treatment: { 'Data Wipe': 'wipe', 'Reuse': 'reuse', 'Destruction': 'destruction' }[container.treatment] ?? container.treatment,
      price: container.detailedItems.reduce((acc, i) => acc + i.disposalCost * i.quantity, 0),
      order: createdOrder.id,
    })
  ));

  return { order: createdOrder, containers: containerResults.map(r => r.data) };
};`,
        language: 'javascript',
      },
      {
        description: 'Unified Asset model — replaces four separate ComputerAsset / HDDAsset / MobileAsset / OtherAsset models with a single polymorphic model using a JSONField for type-specific fields, eliminating schema duplication and enabling cross-type queries while preserving full field fidelity per asset type via the metadata dict.',
        codeSnippet: `class Asset(models.Model):
    ASSET_TYPES = [
        ('computer', 'Computer'),
        ('hdd',      'Hard Drive'),
        ('mobile',   'Mobile Device'),
        ('other',    'Other'),
    ]

    asset_type  = models.CharField(max_length=20, choices=ASSET_TYPES, db_index=True)
    asset_qr    = models.CharField(max_length=100, blank=True, default='')
    owner       = models.ForeignKey(RecyclingCustomer, on_delete=models.CASCADE, null=True, blank=True)
    order       = models.ForeignKey(CollectionOrder,   on_delete=models.SET_NULL, null=True, blank=True)
    container   = models.ForeignKey(CollectionContainer, on_delete=models.SET_NULL, null=True, blank=True)
    destination = models.CharField(max_length=50, blank=True, null=True, choices=Destinations)
    wipe_method = models.CharField(max_length=100, blank=True, default='')
    wipe_result = models.CharField(max_length=100, blank=True, default='')
    wipe_start_time = models.CharField(max_length=100, blank=True, default='')
    wipe_end_time   = models.CharField(max_length=100, blank=True, default='')
    # Type-specific fields (make, model, serial, cpu, ram, storage, screen, etc.)
    metadata = models.JSONField(default=dict, blank=True)
    created      = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['asset_type', 'container']),
            models.Index(fields=['order']),
        ]

    def __str__(self):
        return f"{self.get_asset_type_display()} — {self.asset_qr or self.pk}"`,
        language: 'python',
      },
    ],
    screenshots: [
      { src: rebootHomepage, alt: 'Reboot customer homepage', caption: 'Customer homepage with CTA and services overview' },
      { src: rebootBooking, alt: 'Item selection step', caption: 'Item selection: category → brand → model browse' },
      { src: rebootBookingReview, alt: 'Booking review step', caption: 'Booking review: container summary and rebate estimate' },
      { src: rebootEmployeeDashboard, alt: 'Employee dashboard', caption: 'Employee dashboard: job list with status and actions' },
      { src: rebootAssetIndex, alt: 'Asset index view', caption: 'Asset index: wipe results, spec, and eBay price comparison' },
    ],
    tags: ['Django', 'React', 'Flagship'],
    featured: true,
    displayOrder: 2,
    nextSlug: 'waste-audit-ai',
    toastMessage: 'No UK ITAD company has anything like this. Want to know why?',
  },
  {
    slug: 'waste-audit-ai',
    title: 'Waste Audit Tool — AI Enhanced',
    oneLiner: 'I took my own production waste audit tool and retrofitted three distinct AI layers into it — GPT-4o Vision photo classification, GPT-4o-mini report narrative generation, and scikit-learn anomaly detection — without breaking the existing workflow or data model.',
    status: 'production',
    techStack: ['Django 5.2', 'Python', 'OpenAI API', 'GPT-4o Vision', 'GPT-4o-mini', 'scikit-learn', 'SQLite', 'Tailwind CSS', 'ApexCharts', 'openpyxl', 'Docker'],
    timeframe: '2024–present',
    githubUrl: 'https://github.com/Kozajsza/FMAuditPortfolioVersion',
    problem: `The V1 tool (see: waste-audit) digitised a paper-based audit process and was in active production use. But it still had a ceiling: auditors manually categorised every material by eye, managers had no way to compare contamination rates across customers or over time, and each audit report ended with a blank page where a written analysis should have been. The data was structured and accurate — but extracting insight from it still required manual effort.\n\nAdding AI to a production system that real users depend on every day is a different engineering problem from building AI-first. I couldn't break existing workflows, couldn't require internet connectivity for core features, and every AI call had to be opt-in with a visible cost estimate before triggering. The challenge was fitting AI into constraints that already existed.`,
    solution: `I built three independent AI layers on top of the existing Django backend, each solving a different problem in the audit workflow.\n\nThe first is GPT-4o Vision photo classification. After capturing the post-open container photo, an auditor can click "Analyse with AI" — the backend base64-encodes the image, sends it to GPT-4o with a structured system prompt listing all 15 material categories and 5 stream types, and receives JSON specifying a stream suggestion, up to three material suggestions, and a confidence rating. AI suggestions are never auto-submitted — the auditor always confirms.\n\nThe second is GPT-4o-mini report narrative generation. The existing audit context dictionary is transformed into a structured prompt, optionally injected with a site-specific knowledge base, and sent to GPT-4o-mini. The returned narrative is persisted to the Audit model so subsequent viewers see it without incurring another API call.\n\nThe third is local anomaly detection using scikit-learn's IsolationForest — no API call required. Each container's material weights are normalised to a 15-element fractional feature vector. One IsolationForest model is trained per waste stream and persisted to disk with joblib. At audit review time, containers flagged as anomalous show an amber badge. All AI calls go through a centralised AIService class that enforces token budget checks, logs every call to AIUsageLog, and returns structured error dicts rather than raising exceptions.`,
    highlights: [
      {
        description: 'GPT-4o Vision photo classification — validates and base64-encodes the post-open container photo, builds a multimodal message with a JSON-schema-constrained response format, calls GPT-4o via the shared low-level helper, and sanitises the response into a typed result dict — the AI input layer for the material weight entry form.',
        codeSnippet: `def classify_container_photo(self, container) -> dict:
    if not container.photo2 or not container.photo2.name:
        return {'error': 'No post-open photo available for classification.'}

    photo_path = container.photo2.path
    if not os.path.isfile(photo_path):
        return {'error': 'No post-open photo available for classification.'}

    with open(photo_path, 'rb') as fh:
        b64_data = base64.b64encode(fh.read()).decode('ascii')

    ext = os.path.splitext(photo_path)[1].lower()
    mime_type = {'webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
                 '.png': 'image/png'}.get(ext, 'image/jpeg')

    system_prompt = (self.user.photo_prompt or '').strip() or _DEFAULT_PHOTO_SYSTEM_PROMPT
    vision_messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': [
            {'type': 'image_url',
             'image_url': {'url': f'data:{mime_type};base64,{b64_data}', 'detail': 'low'}},
            {'type': 'text', 'text': 'Analyse this waste container photo and classify the contents.'},
        ]},
    ]
    result = self._call_openai_raw(
        vision_messages, feature='photo_classification',
        model='gpt-4o', max_tokens=300,
        response_format={'type': 'json_object'},
    )
    if result.get('error'):
        return result

    payload = json.loads(result['text'])
    material_suggestions = [str(m) for m in payload.get('material_suggestions', [])[:3]]
    return {
        'stream_suggestion':    payload.get('stream_suggestion', ''),
        'material_suggestions': material_suggestions,
        'confidence':           payload.get('confidence', 'low'),
        'tokens_used':          result['tokens_used'],
    }`,
        language: 'python',
      },
      {
        description: 'AI report narrative with knowledge base injection — assembles a grounded prompt from the audit context dict, prepends the operator\'s uploaded knowledge base and custom recommendation rules to the system prompt, then calls GPT-4o-mini; the narrative persists to the Audit model so subsequent views read from the DB with no API cost.',
        codeSnippet: `def generate_report_narrative(self, audit, audit_context: dict) -> dict:
    main_prompt = (self.user.narrative_prompt_main or '').strip() or _DEFAULT_NARRATIVE_SYSTEM_PROMPT
    kb_text = (self.user.knowledge_base_text or '').strip()
    rules   = (self.user.narrative_recommendation_rules or '').strip()
    links   = (self.user.narrative_links or '').strip()

    system_prompt = main_prompt
    if kb_text:
        system_prompt += '\\n\\n---\\nKnowledge base:\\n' + kb_text
    if rules:
        system_prompt += '\\n\\n---\\nRecommendation rules:\\n' + rules
    if links:
        system_prompt += '\\n\\n---\\nRelevant links:\\n' + links

    stream_lines = '\\n'.join(
        f"  {s['stream']}: total={s['total']}g, contaminated={s['contaminated']}g ({s['pct']:.1f}%)"
        for s in audit_context.get('contamination_by_stream', [])
    ) or '  No stream data recorded.'

    top_materials = sorted(
        audit_context.get('output_summary', []), key=lambda x: x['weight'], reverse=True
    )[:5]
    materials_lines = '\\n'.join(f"  {m['type']}: {m['weight']}g" for m in top_materials)

    user_prompt = (
        f"Audit Reference: {audit.uniqueRef}\\n"
        f"Customer: {audit.customer}\\n"
        f"Overall contamination: {audit_context.get('overall_contamination_percentage', 0):.1f}%\\n"
        f"Containers audited: {len(audit_context.get('containers_outputs', []))}\\n\\n"
        f"Stream breakdown:\\n{stream_lines}\\n\\n"
        f"Top materials by weight:\\n{materials_lines}"
    )
    return self.call_openai(user_prompt, feature='report_narrative',
                            system=system_prompt, max_tokens=1500)`,
        language: 'python',
      },
      {
        description: 'scikit-learn IsolationForest anomaly detection — builds a 15-element fractional feature vector per container (each material type\'s weight as a fraction of total container weight), trains one model per waste stream on historical data with a minimum sample guard, persists models via joblib, and scores each container in a new audit at review time — no API call, no per-user AI flag required.',
        codeSnippet: `FEATURE_ORDER = ['Paper','Cardboard','Paper Cups','Paper Towels','Cans',
                 'Flexible Plastics','Textiles','Food or Coffee','PET',
                 'Coat Hangers','Beverage Cartons','Compostable Packaging',
                 'Haz Waste','Glass','Other Waste']

def _build_feature_vector(container) -> list:
    if not container.weight or container.weight <= 0:
        return None
    output_map = {}
    for output in container.auditoutput_set.all():
        output_map[output.type] = output_map.get(output.type, 0.0) + (output.weight or 0.0)
    return [output_map.get(f, 0.0) / container.weight for f in FEATURE_ORDER]

def train_models() -> dict:
    from sklearn.ensemble import IsolationForest
    import joblib, numpy as np
    results = {}
    for stream in STREAM_CHOICES:
        containers = Container.objects.filter(container_stream=stream).prefetch_related('auditoutput_set')
        X = [v for c in containers if (v := _build_feature_vector(c)) is not None]
        if len(X) < 10:
            continue   # IsolationForest unreliable on tiny datasets
        model = IsolationForest(contamination=0.1, random_state=42)
        model.fit(np.array(X, dtype=float))
        joblib.dump(model, get_model_path(stream))
        results[stream] = len(X)
    return results

def detect_anomalies_for_audit(audit) -> dict:
    import joblib, numpy as np
    model_cache, flags = {}, {}
    for container in audit.container_set.prefetch_related('auditoutput_set').all():
        stream = container.container_stream
        if stream not in model_cache:
            path = get_model_path(stream)
            model_cache[stream] = joblib.load(path) if os.path.exists(path) else None
        if (model := model_cache[stream]) is None:
            continue
        if (vec := _build_feature_vector(container)) is None:
            continue
        flags[container.id] = model.predict(np.array([vec], dtype=float))[0] == -1
    return flags   # {container_id: bool}`,
        language: 'python',
      },
    ],
    cardImage: wasteToolAiCard,
    screenshots: [
      { src: wasteToolAiCard, alt: 'Start a new audit', caption: 'Three-step audit creation: customer name, date, and auditor logged before scanning begins' },
      { src: wasteToolAiSettings, alt: 'AI settings panel', caption: 'AI settings: API key, model selector (GPT-4o / GPT-4o-mini), and monthly token budget with cost estimate' },
      { src: wasteToolAiBenchmarking, alt: 'Benchmarking dashboard', caption: 'Benchmarking: contamination trend over time and stream-by-stream comparison across all customers' },
      { src: wasteToolAiCustomer, alt: 'Customer contamination profile', caption: 'Customer profile: sites, per-audit contamination history with percentages, and trend chart' },
      { src: wasteToolAiSummaryImg, alt: 'AI-generated report narrative', caption: 'AI report narrative: GPT-4o-mini executive summary with flagged streams and numbered recommendations' },
    ],
    tags: ['AI', 'OpenAI API', 'Python', 'Django', 'Production', 'scikit-learn'],
    featured: true,
    displayOrder: 3,
    nextSlug: 'hdd-scanner',
    relatedSlug: 'waste-audit',
    toastMessage: 'Three AI layers retrofitted into a production app — want to know how?',
  },
  {
    slug: 'hdd-scanner',
    title: 'HDD/SSD Label Scanner',
    oneLiner: 'AI vision tool for automated data capture from hardware labels destined for destruction.',
    status: 'beta',
    techStack: ['Python', 'GPT-4o API', 'FastAPI'],
    timeframe: '2025–present',
    problem: `In ITAD operations, drives that won't power on can't be catalogued by tools like Blancco — they don't enumerate. These drives are common: failed, physically damaged, or simply non-functional. Currently, someone has to manually read and type each label (make, model, serial number, capacity) into inventory. On a large pallet this takes hours.\n\nThe bottleneck is entirely avoidable.`,
    solution: `A vision pipeline that photographs hardware labels and extracts structured inventory data using GPT-4o Vision API. Point a phone camera at a drive label; the system returns make, model, serial, capacity, and interface type as structured JSON ready to insert into the inventory system.\n\nThis is a natural extension of the Blancco Parser — it solves the same data integration problem for the drives that Blancco can't reach.`,
    highlights: [
      {
        description: 'GPT-4o Vision extracts structured fields from a label image — make, model, serial, capacity, interface, and form factor returned as typed JSON in a single API call.',
        codeSnippet: `LABEL_EXTRACTION_PROMPT = """
Examine this hardware label image and extract the following fields.
Return JSON only — no explanation.

{
  "make": string,
  "model": string,
  "serial_number": string,
  "capacity_gb": number | null,
  "interface": "SATA" | "NVMe" | "SAS" | "IDE" | "unknown",
  "form_factor": "2.5" | "3.5" | "M.2" | "unknown"
}

If a field is not visible, use null.
"""

def scan_label(image_path: str) -> dict:
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": LABEL_EXTRACTION_PROMPT},
                {"type": "image_url", "image_url": {
                    "url": f"data:image/jpeg;base64,{b64}",
                    "detail": "high"
                }},
            ],
        }],
        max_tokens=300,
    )
    return json.loads(response.choices[0].message.content)`,
        language: 'python',
      },
    ],
    cardImage: hddScannerCard,
    screenshots: [
      { src: hddScannerNewJob, alt: 'New scan order', caption: 'New order: empty job ready for drive label uploads or live camera capture' },
      { src: hddScannerScan1, alt: 'GPT-4o scan result for Teamgroup NVMe SSD', caption: 'Scan result: Teamgroup 512 GB NVMe M.2 extracted at high confidence — make, model, serial, capacity, interface, and form factor in one pass' },
      { src: hddScannerScan2, alt: 'Scan result for HGST SATA HDD', caption: 'Second label: HGST 500 GB SATA HDD identified alongside GPT-4o vs OCR confidence comparison' },
      { src: hddScannerOrder, alt: 'Order with three drives accumulated', caption: 'Order building: three drives catalogued at $0.01 total API cost, ready to export as CSV' },
    ],
    tags: ['AI', 'GPT-4o API', 'Python', 'ITAD', 'Beta'],
    featured: false,
    displayOrder: 4,
    githubUrl: 'https://github.com/Kozajsza/HDDScanner',
    nextSlug: 'discord-bot',
    toastMessage: 'GPT-4o vision vs traditional OCR — guess which won?',
  },
  {
    slug: 'discord-bot',
    title: 'GPT Knowledge Base Discord Bot',
    oneLiner: 'Custom document-grounded Discord assistant built in early 2023 — implementing retrieval-augmented generation from scratch before the term existed.',
    status: 'archived',
    techStack: ['Python', 'Discord.py', 'OpenAI API', 'python-docx'],
    timeframe: 'Early 2023',
    githubUrl: 'https://github.com/Kozajsza/DiscordBot',
    problem: `A company needed staff to have quick access to internal knowledge: product specs, process documentation, FAQ material. The documentation lived in Word files and was rarely consulted because it was hard to search.\n\nThis was early 2023 — before LangChain had reached v1.0, before "RAG" was a term most developers knew. There were no off-the-shelf solutions. The only option was to build it.`,
    solution: `A Discord bot that reads company Word documents at startup, chunks them into manageable segments, and constructs grounded prompts when users ask questions. The bot injects the most relevant document sections into the OpenAI context window alongside the user's question.\n\nBuilt using text-davinci-003 before ChatGPT's API was available. The document-grounding approach — what we'd now call naive RAG — was figured out empirically through iteration. It worked well enough to be used in production for real company knowledge queries.`,
    highlights: [
      {
        description: 'The document-grounded command: the knowledge base is loaded at startup and injected verbatim into the prompt before the user\'s question — the RAG pattern, hand-rolled before LangChain existed.',
        codeSnippet: `def load_knowledge_base(path: str = "Waste.txt") -> str:
    """Load the plain-text knowledge base file used as injected context."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Warning: knowledge base file '{path}' not found. ?chat_fm will have no context.")
        return ""

waste_content: str = load_knowledge_base()

@client.command()
async def chat_fm(ctx: commands.Context, *, message: str) -> None:
    """Send a message to text-davinci-003 with the knowledge-base file as context.

    The knowledge base (Waste.txt) is injected before the user's question so
    the model can answer questions grounded in the document.
    """
    prompt: str = f"{waste_content}\\n\\n{message}"
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            temperature=0.5,
            max_tokens=1024,
            n=1,
            stop=None,
            timeout=15,
        )
        response_text: str = response.choices[0].text[:2000]  # Discord message limit
        await ctx.send(response_text)
    except openai.error.OpenAIError as e:
        await ctx.send(f"OpenAI API error: {e}")`,
        language: 'python',
      },
    ],
    cardPreview: {
      snippet: `waste_content: str = load_knowledge_base()

@client.command()
async def chat_fm(ctx: commands.Context, *, message: str) -> None:
    prompt: str = f"{waste_content}\\n\\n{message}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.5,
        max_tokens=1024,
        n=1,
        stop=None,
        timeout=15,
    )
    response_text: str = response.choices[0].text[:2000]
    await ctx.send(response_text)`,
      language: 'python',
    },
    screenshots: [],
    tags: ['AI', 'Python', 'Early Work', 'OpenAI'],
    featured: true,
    displayOrder: 5,
    nextSlug: 'blancco-parser',
    toastMessage: 'Built before RAG was even a term. Want the story?',
  },
  {
    slug: 'blancco-parser',
    title: 'Blancco XML to Pandas Parser',
    oneLiner: 'Data pipeline utility transforming Blancco Drive Eraser audit reports into structured CSV for inventory integration.',
    status: 'production',
    techStack: ['Python', 'Pandas', 'lxml'],
    timeframe: '2023',
    githubUrl: 'https://github.com/Kozajsza/Blancco-xml-to-pandas',
    problem: `Blancco Drive Eraser exports audit reports as XML. These reports contain serial numbers, make, model, capacity, erasure method, and pass/fail status — exactly the data needed for inventory and compliance records.\n\nManually copying this data from XML reports into spreadsheets was tedious and error-prone. The company processed dozens of drives per day; the bottleneck was real.`,
    solution: `A Python utility that parses Blancco XML reports using lxml, extracts the relevant fields, and outputs a clean Pandas DataFrame that can be saved as CSV or fed directly into the inventory system.\n\nOne of the first production scripts — still used as a component in larger automation pipelines. The XML schema is irregular and inconsistent across Blancco versions, so the parser handles missing fields gracefully.`,
    highlights: [
      {
        description: 'Multi-section XML parsing — each Blancco report section (erasure, drive, system, CPU, RAM, GPU) is walked independently and merged into a single dict with suffix-based column names to avoid key collisions, then padded to equal length before DataFrame construction.',
        codeSnippet: `erasure_entries = root.findall('.//blancco_erasure_report/entries[@name="erasures"]/entries[@name="erasure"]')
drive_entries   = root.findall('.//blancco_erasure_report/entries[@name="erasures"]/entries[@name="erasure"]/entries[@name="target"]')
system_entries  = root.findall('.//blancco_hardware_report/entries[@name="system"]')
cpu_entries     = root.findall('.//blancco_hardware_report/entries[@name="processors"]/entries[@name="processor"]')

data: dict[str, list] = {}

for erasure_entry in erasure_entries:
    for child in erasure_entry:
        data.setdefault(child.get('name'), []).append(child.text)

for drive_entry in drive_entries:
    for child in drive_entry:
        data.setdefault(child.get('name') + "_drive", []).append(child.text)

for system_entry in system_entries:
    for child in system_entry:
        data.setdefault(child.get('name') + "_system", []).append(child.text)

# Pad shorter columns so all lists reach equal length before DataFrame construction
max_len = max(len(lst) for lst in data.values())
for name in data:
    if len(data[name]) < max_len:
        data[name] += [None] * (max_len - len(data[name]))

df = pd.DataFrame(data)`,
        language: 'python',
      },
      {
        description: 'Pandas normalisation — raw Blancco field values are cleaned, unit-converted (bytes to GB), string-scrubbed (vendor noise removed), and assembled into inventory-ready and e-commerce-ready columns in a single pipeline.',
        codeSnippet: `df['Make'] = df['manufacturer_system'].str.replace('Inc.', '', regex=False) \\
                                       .str.replace('Hewlett-Packard', 'HP', regex=False)
df['Model'] = df['model_system'].str.replace('HP', '', regex=False)
df['Serial_Number'] = df['serial_system']

df['CPU'] = df['model_cpu'].str.replace('(R)', '', regex=False) \\
                            .str.replace('(TM)', '', regex=False)

df['RAM'] = df['total_memory_ram'].astype(float).div(1073741824)

df['Storage'] = df['vendor_drive'] + ' ' + df['model_drive']
df['Storage_Serial_Number'] = df['serial_drive']
df['Storage_Capacity'] = df['capacity_drive'].astype(float).div(1073741824).round(1)

df['Wipe_Method'] = df['erasure_standard_name']
df['Wipe_Start_Time'] = pd.to_datetime(df['start_time']).dt.strftime('%A, %d %B %Y at %H:%M:%S')
df['Wipe_End_Time']   = pd.to_datetime(df['end_time']).dt.strftime('%A, %d %B %Y at %H:%M:%S')
df['Wipe_Result'] = df['state']

df['Ecommerce_Title'] = (
    df['Make'] + ' ' + df['Model'] + ' ' + df['CPU']
    + ' ' + df['RAM'].astype(str) + 'GB RAM '
    + df['Storage_Capacity'].astype(str) + 'GB'
)`,
        language: 'python',
      },
    ],
    cardPreview: {
      snippet: `data: dict[str, list] = {}

for erasure_entry in erasure_entries:
    for child in erasure_entry:
        data.setdefault(child.get('name'), []).append(child.text)

for drive_entry in drive_entries:
    for child in drive_entry:
        data.setdefault(child.get('name') + "_drive", []).append(child.text)

max_len = max(len(lst) for lst in data.values())
for name in data:
    if len(data[name]) < max_len:
        data[name] += [None] * (max_len - len(data[name]))

df = pd.DataFrame(data)
df['Make'] = df['manufacturer_system'].str.replace('Inc.', '', regex=False)
df['Storage_Capacity'] = df['capacity_drive'].astype(float).div(1073741824).round(1)`,
      language: 'python',
    },
    screenshots: [],
    tags: ['Python', 'Data', 'Production', 'ITAD', 'Early Work'],
    featured: false,
    displayOrder: 6,
    nextSlug: 'portfolio',
    toastMessage: 'My first Python script — and it\'s still running in production.',
  },
  {
    slug: 'portfolio',
    title: 'Portfolio & AI Chatbot',
    oneLiner: 'This site — a custom React/TypeScript portfolio with a bespoke design system and a GPT-4o chatbot that streams responses from a Cloudflare Worker, with its knowledge base assembled from the same content files that power the rest of the site.',
    status: 'production',
    techStack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Pages', 'OpenAI API'],
    timeframe: '2026',
    cardAccent: 'jade',
    problem: `Most developer portfolios are one of two things: a generic template with swapped-out text, or a wall of bullet points dressed up with animations. Neither actually demonstrates what you can build — they just list it.\n\nThe challenge was to make something that felt personally crafted, technically interesting, and genuinely useful to visitors without becoming a vanity project. It needed to tell a story rather than enumerate credentials, showcase real production code rather than toy examples, and give recruiters and engineers something to engage with beyond a PDF resume.`,
    solution: `A fully custom React 18/TypeScript single-page app with a bespoke design system — warm parchment palette, jade-teal accent (inspired by Fonda Lee's Green Bone Saga), Syne + DM Sans typography, and CSS custom properties throughout. No component library. Every interaction — the cursor spotlight, the card hover bars, the scroll animations — is hand-written.\n\nThe standout feature is the GPT-4o chatbot. A Cloudflare Worker receives POST requests from the frontend, validates input and enforces per-IP rate limits (in-memory sliding window), assembles a context-aware system prompt by injecting which page the visitor is on, and streams the OpenAI response back via Server-Sent Events. The frontend reads the stream with a custom React hook using refs to avoid stale closures. The knowledge base is assembled at bundle time from the same TypeScript content files that drive the rest of the site — a single source of truth, so the chatbot stays in sync with the portfolio automatically.\n\nThe chatbot is itself a portfolio piece: it demonstrates prompt engineering, Cloudflare Workers, SSE streaming, React context management, and practical guardrail design all in one deployable unit.`,
    highlights: [
      {
        description: 'The Cloudflare Worker streams OpenAI\'s SSE response to the browser in a re-encoded format. The transformer reads raw chunks, splits on newlines, parses each `data:` line, extracts the delta content, and re-emits as `{"delta":"..."}` events — keeping the API key server-side while preserving the streaming UX.',
        codeSnippet: `async function streamOpenAI(
  body: ReadableStream<Uint8Array>,
  writer: WritableStreamDefaultWriter<Uint8Array>,
  encoder: TextEncoder,
) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data: ')) continue
        const data = trimmed.slice(6)
        if (data === '[DONE]') {
          await writer.write(encoder.encode('data: [DONE]\\n\\n'))
          return
        }
        try {
          const parsed = JSON.parse(data)
          const delta: string | undefined = parsed.choices?.[0]?.delta?.content
          if (delta) {
            await writer.write(encoder.encode(
              \`data: \${JSON.stringify({ delta })}\\n\\n\`
            ))
          }
        } catch { /* skip malformed lines */ }
      }
    }
    await writer.write(encoder.encode('data: [DONE]\\n\\n'))
  } finally {
    writer.close()
  }
}`,
        language: 'typescript',
      },
      {
        description: 'The React hook uses refs to avoid stale closures — `isLoadingRef` guards against double-sends in async callbacks, and `messagesRef` lets streaming deltas append to the correct message without capturing an outdated array. A `!res.ok` check before reading the stream ensures a 404 or 500 surfaces as an error rather than silently leaving an empty assistant bubble.',
        codeSnippet: `const isLoadingRef = useRef(false)
const messagesRef = useRef<ChatMessage[]>([])

const sendMessage = async (text: string) => {
  if (!text.trim() || isLoadingRef.current) return  // ref, not state
  isLoadingRef.current = true
  setIsLoading(true)

  const res = await fetch('/api/chat', { method: 'POST', ... })
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)  // don't silently swallow 404/500

  outer: while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\\n')
    buf = lines.pop() ?? ''

    for (const line of lines) {
      const data = line.trim().slice(6)
      if (data === '[DONE]') break outer

      const parsed = JSON.parse(data)
      if (parsed.delta) {
        setMessages(prev => {          // functional update — no stale closure
          const last = prev[prev.length - 1]
          const updated = [
            ...prev.slice(0, -1),
            { ...last, content: last.content + parsed.delta },
          ]
          messagesRef.current = updated  // keep ref in sync for next tick
          return updated
        })
      }
    }
  }
}`,
        language: 'typescript',
      },
      {
        description: 'The knowledge base is assembled at bundle time from the same TypeScript content files that drive the rest of the site — single source of truth. The one exception: `projects.ts` imports PNG screenshots at the top level, which esbuild can\'t process in a Worker context, so project summaries are kept as inline constants here instead.',
        codeSnippet: `// src/content/chatbot-context.ts — bundled into the Cloudflare Worker at build time
import { about, aboutTimeline } from './about'   // pure TS — safe to import
import { skillGroups }          from './skills'  // pure TS
import { contact }              from './contact'  // pure TS
import { values }               from './values'   // pure TS
// projects.ts imports PNGs at the top level → Worker bundler can't handle them
// so project summaries live as inline constants in this file instead

export const chatbotSystemContext: string = \`
=== ABOUT MATEUSZ ===
\${buildAboutSection()}

=== CAREER TIMELINE ===
\${buildTimelineSection()}

=== PROJECTS (\${projectSummaries.length} total) ===
\${buildProjectsSection()}

=== SKILLS ===
\${buildSkillsSection()}

=== VALUES ===
\${buildValuesSection()}

=== CONTACT ===
\${buildContactSection()}

=== PERSONAL ===
\${personalInfo}

=== PORTFOLIO & CHATBOT META ===
\${portfolioMeta}
\`.trim()`,
        language: 'typescript',
      },
      {
        description: 'In-memory rate limiting using a sliding window per IP. Each Cloudflare Worker isolate holds its own Map — not a hard global cap, but provides meaningful protection against abuse on a low-traffic portfolio without needing Durable Objects or KV storage.',
        codeSnippet: `const rateLimits = new Map<string, number[]>()
const RATE_WINDOW_MS = 60 * 60 * 1000  // 1 hour
const RATE_LIMIT_MAX = 20

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateLimits.get(ip) ?? [])
    .filter(t => now - t < RATE_WINDOW_MS)     // drop expired entries

  if (timestamps.length >= RATE_LIMIT_MAX) return false

  timestamps.push(now)
  rateLimits.set(ip, timestamps)
  return true
}

// In the handler:
const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
if (!checkRateLimit(ip)) {
  return sseError(
    "You've asked a lot of great questions! To keep costs manageable, " +
    "I limit chats to 20 messages per hour. Come back soon, or reach " +
    "Mateusz directly at kozaq20@gmail.com."
  )
}`,
        language: 'typescript',
      },
      {
        description: 'Focus trap and focus restoration for the chat dialog — meets WCAG 2.1 criterion 2.4.3 (Focus Order). On mount, saves the previously focused element; Tab/Shift-Tab cycle within focusable children; on unmount, focus returns to the trigger button automatically.',
        codeSnippet: `const FOCUSABLE = 'button:not([disabled]), textarea:not([disabled]), ' +
                   'input:not([disabled]), [tabindex]:not([tabindex="-1"])'

useEffect(() => {
  const dialog = dialogRef.current
  if (!dialog) return
  const previouslyFocused = document.activeElement as HTMLElement | null

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE)
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault(); last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
  }

  dialog.addEventListener('keydown', handleTab)
  return () => {
    dialog.removeEventListener('keydown', handleTab)
    previouslyFocused?.focus()            // restore focus on close
  }
}, [])`,
        language: 'typescript',
      },
      {
        description: 'Proactive suggestion bubbles near the chat button — each page has 5–7 questions cycling on a 3s initial delay / 14s show / 10s gap schedule. Timer IDs are stored as `let` bindings so the cleanup closure always cancels whatever is currently pending, even across recursive cycles. A boolean flag approach was the first attempt — it failed because React re-running the effect resets the flag before old timers fire.',
        codeSnippet: `useEffect(() => {
  setCurrent(null)
  setVisible(false)
  if (isOpen) return

  const suggestions = PAGE_SUGGESTIONS[pathname] ?? DEFAULT_SUGGESTIONS
  let index = 0
  // let-bindings: cleanup closes over the variables, not the initial values,
  // so clearTimeout always hits whatever is currently pending
  let tShow: ReturnType<typeof setTimeout>
  let tHide: ReturnType<typeof setTimeout>
  let tNext: ReturnType<typeof setTimeout>

  const schedule = (delay: number) => {
    tShow = setTimeout(() => {
      setCurrent(suggestions[index % suggestions.length])
      setVisible(true)

      tHide = setTimeout(() => {
        setVisible(false)

        tNext = setTimeout(() => {   // gap before next suggestion
          index++
          schedule(10_000)
        }, 400)                      // wait for fade-out animation
      }, 14_000)                     // show for 14 s
    }, delay)
  }

  schedule(3_000)                    // first suggestion after 3 s
  return () => {
    clearTimeout(tShow)              // cancel whichever timer is pending
    clearTimeout(tHide)
    clearTimeout(tNext)
  }
}, [pathname, isOpen])`,
        language: 'typescript',
      },
    ],
    screenshots: [],
    tags: ['React', 'TypeScript', 'AI', 'Cloudflare', 'Design'],
    featured: true,
    displayOrder: 7,
    githubUrl: 'https://github.com/Kozajsza/Portfolio-Public',
    nextSlug: 'waste-audit',
    toastMessage: 'The chatbot answering your questions right now — want to know how it was built?',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.displayOrder - b.displayOrder)
}
