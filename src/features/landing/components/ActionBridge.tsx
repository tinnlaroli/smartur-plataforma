import React from 'react';
import {
  ArrowRight,
  Building2,
  Map,
  ExternalLink,
} from 'lucide-react';

import { useLanguage } from '../../../contexts/LanguageContext';

interface ActionBridgeProps {
  handleStartExperience: () => void;
}

export const ActionBridge: React.FC<ActionBridgeProps> = ({
  handleStartExperience,
}) => {
  const { t } = useLanguage();

  return (
    <section className="action-bridge-section relative z-20 py-16 md:py-24 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="bridge-card relative mx-auto max-w-7xl text-center">

          <div className="relative z-10 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10">

            {/* TOURIST CTA */}

            <button
              onClick={handleStartExperience}
              className="group relative w-full md:w-auto min-w-[420px] rounded-[2.5rem] p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid rgba(var(--rgb-purple-accent), 0.15)',
              }}
            >
              <div className="flex items-center gap-6">

                {/* ICON */}

                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'rgba(var(--rgb-purple-accent), 0.12)',
                    color: 'var(--color-purple)',
                  }}
                >
                  <Map size={38} />
                </div>

                {/* TEXT */}

                <div className="min-w-0 flex-grow text-left">

                  <span
                    className="block text-2xl font-black transition-colors duration-300"
                    style={{
                      color: 'var(--color-text)',
                    }}
                  >
                    {t('actionBridge.tourist.label')}
                  </span>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">

                    <span
                      className="overflow-hidden pt-2 text-base font-medium"
                      style={{
                        color: 'var(--color-text-alt)',
                      }}
                    >
                      {t('actionBridge.tourist.description')}
                    </span>

                  </div>
                </div>

                {/* ARROW */}

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'rgba(var(--rgb-purple-accent), 0.08)',
                  }}
                >
                  <ArrowRight
                    size={22}
                    className="transition-colors duration-300"
                    style={{
                      color: 'var(--color-purple)',
                    }}
                  />
                </div>
              </div>
            </button>

            {/* SEPARATOR */}

            <div
              className="hidden h-16 w-px md:block"
              style={{
                background:
                  'rgba(var(--rgb-text), 0.08)',
              }}
            />

            {/* BUSINESS CTA */}

            <a
              href="https://tinnlaroli.github.io/smartur-landing/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full md:w-auto min-w-[420px] rounded-[2.5rem] p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid rgba(var(--rgb-cyan-accent), 0.15)',
              }}
            >
              <div className="flex items-center gap-6">

                {/* ICON */}

                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'rgba(var(--rgb-cyan-accent), 0.12)',
                    color: 'var(--color-cyan)',
                  }}
                >
                  <Building2 size={38} />
                </div>

                {/* TEXT */}

                <div className="min-w-0 flex-grow text-left">

                  <span
                    className="block text-2xl font-black transition-colors duration-300"
                    style={{
                      color: 'var(--color-text)',
                    }}
                  >
                    {t('actionBridge.business.label')}
                  </span>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">

                    <span
                      className="overflow-hidden pt-2 text-base font-medium"
                      style={{
                        color: 'var(--color-text-alt)',
                      }}
                    >
                      {t('actionBridge.business.description')}
                    </span>

                  </div>
                </div>

                {/* ARROW */}

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      'rgba(var(--rgb-cyan-accent), 0.08)',
                  }}
                >
                  <ExternalLink
                    size={22}
                    className="transition-colors duration-300"
                    style={{
                      color: 'var(--color-cyan)',
                    }}
                  />
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};