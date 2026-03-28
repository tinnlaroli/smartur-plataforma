import React from 'react';
import { ArrowRight, Building2, Map, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ActionBridgeProps {
  handleStartExperience: () => void;
}

export const ActionBridge: React.FC<ActionBridgeProps> = ({ handleStartExperience }) => {
  const { t } = useLanguage();

  return (
    <section className="action-bridge-section relative z-20 py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="bridge-card relative p-4 md:p-8 text-center max-w-5xl mx-auto">
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
            
            {/* Tourist CTA (Secondary) -> Styled with Purple primary colors */}
            <button onClick={handleStartExperience} className="bridge-action group relative w-full md:w-auto min-w-[320px] shadow-xl hover:shadow-2xl p-4 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-5">
                <div className="icon-box-tourist w-16 h-16 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-[#f6eafe] text-[#9333ea]">
                  <Map size={32} />
                </div>
                <div className="text-left flex-grow min-w-0">
                  <span className="bridge-label-tourist block text-xl font-bold transition-colors text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-200">{t('actionBridge.tourist.label')}</span>
                   <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                    <span className="bridge-desc overflow-hidden text-sm font-medium block pt-1 text-slate-500 dark:text-zinc-300">
                      {t('actionBridge.tourist.description')}
                    </span>
                  </div>
                </div>
                <div className="action-arrow-tourist w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-slate-50 group-hover:bg-purple-500">
                  <ArrowRight size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </button>

            {/* Separator */}
            <div className="hidden md:block w-px h-12 bg-slate-200/50"></div>
            
            {/* Business CTA (Primary) -> Styled with clear/gray colors */}
            <a 
              href={import.meta.env.VITE_BUSINESS_URL || 'https://tinnlaroli.github.io/smartur-landing/'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bridge-action group relative w-full md:w-auto min-w-[320px] shadow-xl hover:shadow-2xl p-4 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-5">
                <div className="icon-box w-16 h-16 shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 bg-slate-50 text-slate-600">
                  <Building2 size={32} />
                </div>
                <div className="text-left flex-grow min-w-0">
                  <span className="bridge-label block text-xl font-bold transition-colors text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200">{t('actionBridge.business.label')}</span>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
                    <span className="bridge-desc overflow-hidden text-sm font-medium block pt-1 text-slate-500 dark:text-zinc-300">
                      {t('actionBridge.business.description')}
                    </span>
                  </div>
                </div>
                <div className="action-arrow w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-slate-50 group-hover:bg-slate-800">
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
            </a>


          </div>
        </div>
      </div>
    </section>
  );
};
