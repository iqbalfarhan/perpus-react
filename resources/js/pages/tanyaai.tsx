import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import AISystemInstruction from '@/lib/ai-system-instruction';
import { BreadcrumbItem } from '@/types';
import { GoogleGenAI } from '@google/genai';
import { RefreshCw, Send } from 'lucide-react';
import React, { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tanya AI',
    href: route('tanyaai'),
  },
];
type TanyaAIProps = {
  api_key: string;
};

const TanyaAI: FC<TanyaAIProps> = ({ api_key }) => {
  const ai = new GoogleGenAI({ apiKey: api_key });

  const [chat, setChat] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resp, setResp] = useState<string | undefined>('Hai, saya bisa bantu tentang alur kerja aplikasi');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: chat,
      config: {
        systemInstruction: AISystemInstruction,
      },
    });

    setResp(response.text);
    setChat('');
    setLoading(false);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Container title="Tanya AI seputar aplikasi perpus ini" description="Tanya apapun yang kamu mau tapi seputar aplikasi ini aja">
        <Card className="w-full max-w-4xl self-center">
          <CardContent>
            {loading ? (
              <Button variant="ghost" disabled>
                <RefreshCw className="animate-spin" />
                Loading...
              </Button>
            ) : (
              resp && (
                <article className="prose prose-invert">
                  <ReactMarkdown>{resp}</ReactMarkdown>
                </article>
              )
            )}
          </CardContent>
          <Separator />
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input placeholder="Tanya sama ai tulis disini..." value={chat} onChange={(e) => setChat(e.target.value)} />
              <Button size={'icon'} type="submit" disabled={!chat}>
                <Send />
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </AppLayout>
  );
};

export default TanyaAI;
