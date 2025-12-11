import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { calculatePaymentPlan, type PaymentPlanItem } from '@/lib/csvParser';
import { saveAs } from 'file-saver';
import { X, Download, Calendar, DollarSign, Calculator, Loader2 } from 'lucide-react';
import { FloorPlanUnit } from '@/lib/csvParser';

interface PaymentModalProps {
    unit: FloorPlanUnit;
    onClose: () => void;
}

export default function PaymentModal({ unit, onClose }: PaymentModalProps) {
    const [currency, setCurrency] = useState<'TL' | 'USD'>('TL');
    const [downPaymentDate, setDownPaymentDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const price = currency === 'TL' ? (unit.priceTL || 0) : (unit.priceUSD || 0);

    const plan = useMemo(() => {
        return calculatePaymentPlan(price, downPaymentDate);
    }, [price, downPaymentDate]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = async () => {
        try {
            setIsExporting(true);
            const jsPDFModule = await import('jspdf');
            // Handle both esModule default export and direct constructor export
            const jsPDFConstructor = jsPDFModule.default || (jsPDFModule as any).jsPDF;
            if (!jsPDFConstructor) throw new Error('jsPDF constructor not found');

            const autoTableModule = await import('jspdf-autotable');
            const autoTable = autoTableModule.default;

            const doc = new jsPDFConstructor();

            // Add font support for Turkish characters would be needed ideally, but sticking to standard for now or basic Latin
            doc.setFontSize(20);
            doc.text(`Ödeme Planı - Daire ${unit.block}-${unit.unitNumber}`, 14, 22);

            doc.setFontSize(12);
            doc.text(`Toplam Fiyat: ${price.toLocaleString()} ${currency}`, 14, 32);
            doc.text(`Tarih: ${new Date().toLocaleDateString()}`, 14, 38);

            autoTable(doc, {
                startY: 45,
                head: [['Taksit', 'Tarih', 'Tutar', 'Açıklama']],
                body: plan.map(p => [
                    p.installmentNo === 0 ? 'Peşinat' : p.installmentNo.toString(),
                    p.date,
                    `${p.amount.toLocaleString()} ${currency}`,
                    p.description
                ]),
                theme: 'grid',
                headStyles: { fillColor: [255, 107, 26] } // Orange brand color
            });

            doc.save(`Odeme_Plani_${unit.block}_${unit.unitNumber}.pdf`);
        } catch (error) {
            console.error('Export PDF error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportExcel = async () => {
        try {
            setIsExporting(true);
            const XLSX = await import('xlsx');

            const worksheet = XLSX.utils.json_to_sheet(plan.map(p => ({
                'Taksit No': p.installmentNo === 0 ? 'Peşinat' : p.installmentNo,
                'Tarih': p.date,
                'Tutar': p.amount,
                'Para Birimi': currency,
                'Açıklama': p.description
            })));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Ödeme Planı");
            XLSX.writeFile(workbook, `Odeme_Plani_${unit.block}_${unit.unitNumber}.xlsx`);
        } catch (error) {
            console.error('Export Excel error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleExportWord = async () => {
        try {
            setIsExporting(true);
            const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, WidthType } = await import('docx');

            const doc = new Document({
                sections: [{
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Ödeme Planı - Blok ${unit.block} Daire ${unit.unitNumber}`,
                                    bold: true,
                                    size: 32,
                                }),
                            ],
                            alignment: AlignmentType.CENTER,
                            spacing: { after: 200 },
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Toplam Fiyat: ${price.toLocaleString()} ${currency}`,
                                    bold: true,
                                    size: 24
                                })
                            ],
                            spacing: { after: 200 }
                        }),
                        new Table({
                            width: { size: 100, type: WidthType.PERCENTAGE },
                            rows: [
                                new TableRow({
                                    children: ['Taksit', 'Tarih', 'Tutar', 'Açıklama'].map(header =>
                                        new TableCell({
                                            children: [new Paragraph({ text: header, style: 'Heading3' })],
                                            shading: { fill: "ff6b1a" }
                                        })
                                    ),
                                }),
                                ...plan.map(p =>
                                    new TableRow({
                                        children: [
                                            new TableCell({ children: [new Paragraph(p.installmentNo === 0 ? 'Peşinat' : p.installmentNo.toString())] }),
                                            new TableCell({ children: [new Paragraph(p.date)] }),
                                            new TableCell({ children: [new Paragraph(`${p.amount.toLocaleString()} ${currency}`)] }),
                                            new TableCell({ children: [new Paragraph(p.description)] }),
                                        ],
                                    })
                                ),
                            ],
                        }),
                    ],
                }],
            });

            const blob = await Packer.toBlob(doc);
            saveAs(blob, `Odeme_Plani_${unit.block}_${unit.unitNumber}.docx`);
        } catch (error) {
            console.error('Export Word error:', error);
        } finally {
            setIsExporting(false);
        }
    };

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-slate-900 border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-slate-900/50">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            Ödeme Planı Hesaplama
                        </h3>
                        <p className="text-white/40 text-sm mt-1">
                            {unit.block} Blok, Daire {unit.unitNumber}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">

                    {/* Controls Panel */}
                    <div className="w-full md:w-80 bg-black/10 p-6 border-r border-white/10 flex flex-col gap-6">

                        {/* Currency Toggle */}
                        <div>
                            <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Para Birimi</label>
                            <div className="flex bg-black/40 p-1 rounded-lg">
                                <button
                                    onClick={() => setCurrency('TL')}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${currency === 'TL' ? 'bg-[#ff6b1a] text-white shadow-lg' : 'text-white/50 hover:text-white'}`}
                                >
                                    TL
                                </button>
                                <button
                                    onClick={() => setCurrency('USD')}
                                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${currency === 'USD' ? 'bg-[#ff6b1a] text-white shadow-lg' : 'text-white/50 hover:text-white'}`}
                                >
                                    USD
                                </button>
                            </div>
                        </div>

                        {/* Price Info */}
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="text-xs text-white/50 mb-1">Satış Fiyatı</div>
                            <div className="text-2xl font-black text-white tracking-tight">
                                {price.toLocaleString()} {currency}
                            </div>
                        </div>

                        {/* Date Input */}
                        <div>
                            <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Peşinat Tarihi</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                                <input
                                    type="date"
                                    value={downPaymentDate}
                                    onChange={(e) => setDownPaymentDate(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-3 text-white text-sm focus:outline-none focus:border-[#ff6b1a] transition-colors"
                                />
                            </div>
                            <p className="text-[10px] text-white/30 mt-2">
                                *İlk taksit tarihi (Peşinat) değiştirilirse diğer taksitler otomatik güncellenir.
                            </p>
                        </div>

                        {/* Summary */}
                        <div className="mt-auto space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Peşinat (%30)</span>
                                <span className="text-white font-bold">{(price * 0.3).toLocaleString()} {currency}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-white/50">Vade (20 Ay)</span>
                                <span className="text-white font-bold">{(price * 0.7 / 20).toLocaleString()} {currency}/ay</span>
                            </div>
                        </div>

                    </div>

                    {/* Table Panel */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white/5">
                        {/* Toolbar */}
                        <div className="p-4 border-b border-white/10 flex justify-end gap-2">
                            <button onClick={handleExportPDF} className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm transition-colors font-medium border border-red-500/20">
                                <Download className="w-4 h-4" /> PDF
                            </button>
                            <button onClick={handleExportExcel} className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm transition-colors font-medium border border-green-500/20">
                                <Download className="w-4 h-4" /> Excel
                            </button>
                            <button onClick={handleExportWord} className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg text-sm transition-colors font-medium border border-blue-500/20">
                                <Download className="w-4 h-4" /> Word
                            </button>
                        </div>

                        {/* Table */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-bold text-white/40 border-b border-white/10">
                                        <th className="px-4 py-3 uppercase tracking-wider w-16">No</th>
                                        <th className="px-4 py-3 uppercase tracking-wider">Tarih</th>
                                        <th className="px-4 py-3 uppercase tracking-wider text-right">Tutar</th>
                                        <th className="px-4 py-3 uppercase tracking-wider text-right">Açıklama</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {plan.map((row, i) => (
                                        <tr key={i} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${row.installmentNo === 0 ? 'bg-[#ff6b1a]/10' : ''}`}>
                                            <td className="px-4 py-3 text-white/70 font-mono">
                                                {row.installmentNo === 0 ? <span className="text-[#ff6b1a] font-bold">Peşinat</span> : row.installmentNo}
                                            </td>
                                            <td className="px-4 py-3 text-white">
                                                {new Date(row.date).toLocaleDateString('tr-TR')}
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-white">
                                                {row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currency}
                                            </td>
                                            <td className="px-4 py-3 text-right text-white/50 text-xs">
                                                {row.description}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        , document.body);
}
