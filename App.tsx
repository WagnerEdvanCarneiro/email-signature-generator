import React, { useState, useRef } from 'react';
import { Download, User, Building2, Phone, Mail, Globe, Upload, Trash2, RotateCcw } from 'lucide-react';
import { toPng } from 'html-to-image';

interface SignatureData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department1: string;
  companyYears: number;
  phone1: string;
  phone2: string;
  email: string;
  website: string;
  accentColor: string;
  logo: string | null;
}

const initialData: SignatureData = {
  firstName: 'Wagner',
  lastName: 'Carneiro',
  jobTitle: 'Coordenador',
  department1: 'Inovação',
  companyYears: 57,
  phone1: '67-3389-0700',
  phone2: '67-98177-0200',
  email: 'wagner.carneiro@vetorial.com.br',
  website: 'www.vetorial.com.br',
  accentColor: '#40976F', // Fixed color
  logo: null,
};

// Helper: Gera ícones SVG como Data URIs
const getIcon = (type: 'phone' | 'mail' | 'globe', colorHex: string) => {
  let path = '';
  switch (type) {
    case 'phone':
      path = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>';
      break;
    case 'mail':
      path = '<rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>';
      break;
    case 'globe':
      path = '<circle cx="12" cy="12" r="10"></circle><line x1="2" x2="22" y1="12" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>';
      break;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${colorHex}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Helper: Template de assinatura (Desacoplado do Componente Principal do React)
const generateHtml = (data: SignatureData) => {
  const phoneIcon = getIcon('phone', data.accentColor);
  const mailIcon = getIcon('mail', data.accentColor);
  const globeIcon = getIcon('globe', data.accentColor);

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; line-height: 1.3; color: #000000; border-collapse: collapse; background-color: white; width: 100%;">
  <tbody>
    <tr>
      <td style="padding-right: 15px; border-right: 2px solid ${data.accentColor}; vertical-align: top; width: 45%;">
        <div style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 14px; margin-bottom: 4px; color: #000000;">
          ${data.firstName} ${data.lastName}
        </div>
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; margin-bottom: 2px; color: #000000;">
          ${data.jobTitle}
        </div>
        <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #000000;">
          ${data.department1}
        </div>
      </td>
      <td style="padding-left: 15px; vertical-align: top; width: 55%;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding-bottom: 4px; padding-right: 6px; vertical-align: middle; width: 16px;">
                <img src="${phoneIcon}" alt="Phone" width="12" height="12" style="display: block;" />
              </td>
              <td style="padding-bottom: 4px; vertical-align: middle; font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #000000;">
                <span style="text-decoration: none; color: #000000; white-space: nowrap;">${data.phone1}</span>
                ${data.phone2 ? ` | <span style="text-decoration: none; color: #000000; white-space: nowrap;">${data.phone2}</span>` : ''}
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 4px; padding-right: 6px; vertical-align: middle; width: 16px;">
                <img src="${mailIcon}" alt="Email" width="12" height="12" style="display: block;" />
              </td>
              <td style="padding-bottom: 4px; vertical-align: middle; font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #000000;">
                <span style="text-decoration: none; color: #000000;">${data.email}</span>
              </td>
            </tr>
            <tr>
              <td style="padding-right: 6px; vertical-align: middle; width: 16px;">
                <img src="${globeIcon}" alt="Website" width="12" height="12" style="display: block;" />
              </td>
              <td style="vertical-align: middle; font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: #000000;">
                <span style="text-decoration: none; color: #000000;">${data.website}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top: 8px;">
        <div style="border-bottom: 2px solid ${data.accentColor}; width: 100%; margin-bottom: 6px;"></div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-family: Arial, Helvetica, sans-serif; font-weight: normal; font-size: 11px; color: #000000;">
            Vetorial - ${data.companyYears} anos de história
          </div>
          ${data.logo ? `<div><img src="${data.logo}" alt="Logo" style="max-height: 28px; display: block;" /></div>` : ''}
        </div>
      </td>
    </tr>
  </tbody>
</table>
  `.trim();
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  containerClassName?: string;
}

// Componente Reutilizável de Formulário para um código DRY (Don't Repeat Yourself)
const InputField: React.FC<InputFieldProps> = ({ label, containerClassName = '', ...props }) => (
  <div className={`space-y-1 ${containerClassName}`}>
    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#40976F]/20 focus:border-[#40976F] transition-all"
    />
  </div>
);

export default function App() {
  const [data, setData] = useState<SignatureData>(initialData);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setData({ ...initialData, logo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setData((prev) => ({ ...prev, logo: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const exportPng = async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 400,
        height: 180,
        backgroundColor: '#ffffff',
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = 'assinatura-vetorial.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Gerador de Assinatura de E-mail Vetorial
          </h1>
          <p className="text-slate-500 text-lg">
            Crie e exporte sua assinatura personalizada | Powered by Wagner Carneiro
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Seção de Formulário */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
                title="Restaurar dados iniciais"
              >
                <RotateCcw size={16} />
                Limpar Campos
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <User size={20} className="text-[#40976F]" />
                Preencha seus Dados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nome" type="text" name="firstName" value={data.firstName} onChange={handleChange} />
                <InputField label="Sobrenome" type="text" name="lastName" value={data.lastName} onChange={handleChange} />
                <InputField label="Cargo" type="text" name="jobTitle" value={data.jobTitle} onChange={handleChange} containerClassName="md:col-span-2" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <Building2 size={20} className="text-[#40976F]" />
                Empresa & Contato
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Departamento" type="text" name="department1" value={data.department1} onChange={handleChange} />
                  <InputField label="Anos de História" type="number" name="companyYears" min="57" value={data.companyYears} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label={<><Phone size={12} /> Telefone 1</>} type="text" name="phone1" value={data.phone1} onChange={handleChange} />
                  <InputField label={<><Phone size={12} /> Telefone 2</>} type="text" name="phone2" value={data.phone2} onChange={handleChange} />
                </div>

                <InputField label={<><Mail size={12} /> E-mail</>} type="email" name="email" value={data.email} onChange={handleChange} />
                <InputField label={<><Globe size={12} /> Website</>} type="text" name="website" value={data.website} onChange={handleChange} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-800">
                <Upload size={20} className="text-[#40976F]" />
                Logo da Empresa
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                  >
                    Escolher Logo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  {data.logo && (
                    <button
                      onClick={removeLogo}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover Logo"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                {data.logo && (
                  <div className="mt-2 p-2 border border-slate-200 rounded-lg inline-block">
                    <img src={data.logo} alt="Logo Preview" className="h-12 object-contain" />
                  </div>
                )}
                <p className="text-xs text-slate-500">
                  Recomendado: Imagem PNG com fundo transparente.
                </p>
              </div>
            </div>
          </div>

          {/* Seção de Visualização na Tela */}
          <div className="lg:col-span-7 space-y-6">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h3 className="font-semibold text-slate-700">Visualização</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={exportPng}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#40976F] hover:bg-[#357a5a] text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                      <Download size={18} />
                      Exportar PNG (400x180px)
                    </button>
                  </div>
                </div>

                <div className="p-8 md:p-12 overflow-x-auto bg-white flex justify-center items-center min-h-[300px]">
                  <div className="flex items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-xl" style={{ minHeight: '300px' }}>
                    {/* Container para escalar visualmente */}
                    <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                      {/* O wrapper a seguir é o que é fisicamente exportado para imagem */}
                      <div
                        ref={previewRef}
                        style={{ width: '400px', height: '180px', backgroundColor: 'white' }}
                        className="flex items-center p-4 box-border shadow-sm border border-slate-100"
                      >
                        <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: generateHtml(data) }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    Instruções: Clique em "Exportar PNG" para baixar a imagem da sua assinatura.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
